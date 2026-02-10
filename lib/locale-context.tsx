"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Locale, localeDirections } from "@/i18n/config";

interface LocaleContextType {
  locale: Locale;
  direction: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  // Initialize locale from localStorage or default
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale;
    const initialLocale = savedLocale || "en";
    setLocaleState(initialLocale);
    setDirection(localeDirections[initialLocale]);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setDirection(localeDirections[newLocale]);
    localStorage.setItem("locale", newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, direction, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocaleContext must be used within a LocaleProvider");
  }
  return context;
}