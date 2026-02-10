"use client";

import { useTranslations } from "next-intl";
import { Separator } from "@/components/ui/separator";
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
  const t = useTranslations("dashboard");

  return (
    <>
      {showSeparator && <Separator />}
      <section>
        <h2 className="text-xl font-semibold mb-4">{t(titleKey)}</h2>
        {children}
      </section>
    </>
  );
}
