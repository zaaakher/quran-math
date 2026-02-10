"use client";

import React from "react";
import { IntlProvider } from "next-intl";
import { Locale, localeDirections } from "@/i18n/config";

interface ProvidersProps {
  children: React.ReactNode;
  locale: Locale;
  messages: Record<string, any>;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  const direction = localeDirections[locale];

  return (
    <IntlProvider locale={locale} messages={messages} timeZone="UTC">
      {children}
    </IntlProvider>
  );
}
