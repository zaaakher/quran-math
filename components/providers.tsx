"use client";

import React, { Suspense, useEffect, useState } from "react";
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
  const { surahs, progress, setIsLoading } = useQuranStore();

  useEffect(() => {
    loadLocaleMessages(locale).then(setMessages);
  }, [locale]);

  useEffect(() => {
    // Fetch Quran data if not already loaded
    if (surahs.length === 0) {
      setIsLoading(true);
      fetchAndStoreQuranData()
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error("Error fetching Quran data:", error);
          setIsLoading(false);
        });
    }
  }, [surahs.length, setIsLoading]);

  // Only render when we have messages, Quran data loaded, AND loading is complete
  if (!messages || Object.keys(messages).length === 0 || surahs.length === 0 || progress < 100) {
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
