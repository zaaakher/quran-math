'use client'

import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

interface DashboardSectionProps {
  titleKey: string;
  children: ReactNode;
  showSeparator?: boolean;
}

export function DashboardSection({
  titleKey,
  children,
  showSeparator = true
}: DashboardSectionProps) {
  // For server components, we'll use the key directly as a fallback
  // The actual translation will be handled by the parent component
  const t = useTranslations("dashboard"); // Ensure translations are loaded
  const title = titleKey;

  return (
    <>
      {showSeparator && <Separator />}
      <section>
        <h2 className="text-xl font-semibold mb-4">{t(title)}</h2>
        {children}
      </section>
    </>
  );
}
