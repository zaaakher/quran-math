"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { NextIntlClientProvider } from "next-intl";
import { Locale, localeDirections } from "@/i18n/config";
import { useLocaleContext } from "@/lib/locale-context";
import { LoadingScreen } from "@/components/loading-screen";
import { useQuranStore } from "@/lib/store";
import { fetchAndStoreQuranData } from "@/lib/quran-api";

interface ProvidersProps {
  children: React.ReactNode;
  initialLocale: Locale;
  initialMessages: Record<string, any>;
}

// Lazy load the locale messages
async function loadLocaleMessages(locale: Locale): Promise<Record<string, any>> {
  try {
    const messages = await import(`../messages/${locale}.json`);
    return messages.default || messages;
  } catch (error) {
    console.warn(`Failed to load messages for locale ${locale}:`, error);
    // Fallback to English
    const enMessages = await import(`../messages/en.json`);
    return enMessages.default || enMessages;
  }
}

function LocaleWrapper({ children }: { children: React.ReactNode }) {
  const { locale, direction } = useLocaleContext();
  const [messages, setMessages] = useState<Record<string, any>>({});
  const surahs = useQuranStore((state) => state.surahs);
  const progress = useQuranStore((state) => state.progress);
  const [isReady, setIsReady] = useState(false);
  const fetchAttempted = useRef(false);

  useEffect(() => {
    loadLocaleMessages(locale).then(setMessages);
  }, [locale]);

  useEffect(() => {
    // Only fetch if we haven't already and we don't have data
    const state = useQuranStore.getState();
    if (state.surahs.length === 0 && !fetchAttempted.current) {
      fetchAttempted.current = true;
      fetchAndStoreQuranData().catch(() => {
        fetchAttempted.current = false; // Allow retry on error
      });
    }
  }, []);

  // Watch for progress to reach exactly 100
  useEffect(() => {
    if (surahs.length > 0 && progress === 100) {
      // Give a small delay to ensure all data is properly set
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [surahs.length, progress]);

  // Only render when progress is exactly 100 (not 99, not 100.0001)
  const shouldShowLoading = progress < 100 || surahs.length === 0 || !messages || Object.keys(messages).length === 0;

  if (shouldShowLoading || !isReady) {
    return <LoadingScreen />;
  }

  return (
    <div dir={direction}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}

export function Providers({ 
  children, 
  initialLocale, 
  initialMessages 
}: ProvidersProps) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <NextIntlClientProvider locale={initialLocale} messages={initialMessages}>
        <LocaleWrapper>
          {children}
        </LocaleWrapper>
      </NextIntlClientProvider>
    </Suspense>
  );
}
