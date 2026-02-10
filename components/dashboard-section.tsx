'use client'

import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

interface DashboardSectionProps {
  titleKey: string;
  children: ReactNode;
  showSeparator?: boolean;
  id?: string;
}

export function DashboardSection({
  titleKey,
  children,
  showSeparator = true,
  id
}: DashboardSectionProps) {
  const t = useTranslations("dashboard");
  const title = titleKey;

  return (
    <>
      {showSeparator && <Separator />}
      <section id={id}>
        <h2 className="text-xl font-semibold mb-4">{t(title)}</h2>
        {children}
      </section>
    </>
  );
}
