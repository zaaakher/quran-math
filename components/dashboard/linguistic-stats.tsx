'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

interface LinguisticStatsProps {
  stats: {
    totalWords: number;
    totalLetters: number;
    uniqueWords: number;
    averageWordLength: number;
    typeTokenRatio: number;
  };
}

export function LinguisticStats({ stats }: LinguisticStatsProps) {
  const t = useTranslations("dashboard");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("linguistic_statistics")}</CardTitle>
        <CardDescription>{t("comprehensive_text_analysis")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t("total_words")}</p>
            <p className="text-2xl font-bold">{stats.totalWords.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t("unique_words")}</p>
            <p className="text-2xl font-bold">{stats.uniqueWords.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t("total_letters")}</p>
            <p className="text-2xl font-bold">{stats.totalLetters.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t("avg_word_length")}</p>
            <p className="text-2xl font-bold">{stats.averageWordLength} {t("characters")}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t("type_token_ratio")}</p>
            <p className="text-2xl font-bold">{stats.typeTokenRatio}%</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t("word_diversity")}</p>
            <Badge variant="secondary">
              {stats.uniqueWords / stats.totalWords > 0.15 ? t("high") : t("moderate")}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
