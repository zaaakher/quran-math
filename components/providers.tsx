"use client";

import React, { Suspense, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { Locale, localeDirections } from "@/i18n/config";
import { useLocaleContext } from "@/lib/locale-context";
import { LoadingScreen } from "@/components/loading-screen";

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

  useEffect(() => {
    loadLocaleMessages(locale).then(setMessages);
  }, [locale]);

  // Only render when we have messages loaded
  if (!messages || Object.keys(messages).length === 0) {
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
