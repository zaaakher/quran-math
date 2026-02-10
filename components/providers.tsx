"use client";

import React from "react";
import { IntlProvider } from "next-intl";
import { DirectionProvider } from "@/components/ui/direction";
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
      <DirectionProvider dir={direction} direction={direction}>
        {children}
      </DirectionProvider>
    </IntlProvider>
  );
}
