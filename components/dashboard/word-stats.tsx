'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchFullQuran } from "@/lib/quran-api";
import { getLinguisticStats } from "@/lib/analysis";
import { useTranslations } from "next-intl";

export function WordStats() {
  const t = useTranslations("dashboard");

  // Note: This component now needs to be updated to fetch data client-side
  // For now, we'll keep the structure but remove server-side logic
  // The actual data fetching should be moved to a parent component or use SWR

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("word_letter_count")}</CardTitle>
        <CardDescription>{t("approximate_from_arabic_text")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">{t("total_words")}</p>
            <p className="text-3xl font-bold mt-2">Loading...</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">{t("total_letters")}</p>
            <p className="text-3xl font-bold mt-2">Loading...</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
