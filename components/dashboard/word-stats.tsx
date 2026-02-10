'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface WordStatsProps {
  totalWords: number;
  totalLetters: number;
}

export function WordStats({ totalWords, totalLetters }: WordStatsProps) {
  const t = useTranslations("dashboard");

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
            <p className="text-3xl font-bold mt-2">{totalWords.toLocaleString()}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">{t("total_letters")}</p>
            <p className="text-3xl font-bold mt-2">{totalLetters.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
