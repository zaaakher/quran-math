"use client";

import { useLocaleContext } from "@/lib/locale-context";
import { DashboardPageContent } from "./dashboard-page-content";

export function DashboardWrapper() {
  const { locale } = useLocaleContext();
  
  return <DashboardPageContent locale={locale} />;
}