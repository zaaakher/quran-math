"use client";

import { useTranslations } from "next-intl";

interface ErrorDisplayProps {
  messageKey: string;
  namespace?: string;
}

export function ErrorDisplay({ messageKey, namespace = "common" }: ErrorDisplayProps) {
  const t = useTranslations(namespace);

  return (
    <div className="container py-12 text-center">
      <p className="text-destructive">{t(messageKey)}</p>
    </div>
  );
}
