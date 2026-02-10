'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface AyahCountStats {
  total: number;
  avg: number;
  median: number;
  min: number;
  max: number;
  surahCount: number;
}

interface StatsCardsProps {
  ayahStats: AyahCountStats;
  sajdaTotal: number;
  sajdaObligatory: number;
  sajdaRecommended: number;
}

export function StatsCards({
  ayahStats,
  sajdaTotal,
  sajdaObligatory,
  sajdaRecommended,
}: StatsCardsProps) {
  const t = useTranslations("dashboard");
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t("ayah_count_statistics")}</CardTitle>
          <CardDescription>{t("per_surah_verse_distribution")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("total_ayahs")}</span>
            <span className="font-medium">{ayahStats.total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("average_per_surah")}</span>
            <span className="font-medium">{ayahStats.avg.toFixed(1)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("median_per_surah")}</span>
            <span className="font-medium">{ayahStats.median}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("shortest_surah_ayahs")}</span>
            <span className="font-medium">{ayahStats.min}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("longest_surah_ayahs")}</span>
            <span className="font-medium">{ayahStats.max}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t("sajda_breakdown")}</CardTitle>
          <CardDescription>{t("prostration_verse_types")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("total_sajda_verses")}</span>
            <span className="font-medium">{sajdaTotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("obligatory")}</span>
            <span className="font-medium">{sajdaObligatory}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("recommended")}</span>
            <span className="font-medium">{sajdaRecommended}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
