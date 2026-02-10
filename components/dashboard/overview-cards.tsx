"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Layers, Moon, Sun, CircleDot, BookMarked, FileText } from "lucide-react";

interface OverviewCardsProps {
  totalAyahs: number;
  totalSurahs: number;
  totalPages: number;
  totalRukus: number;
  totalSajdas: number;
  meccanAyahs: number;
  medinanAyahs: number;
  meccanSurahs: number;
  medinanSurahs: number;
}

export function OverviewCards({
  totalAyahs,
  totalSurahs,
  totalPages,
  totalRukus,
  totalSajdas,
  meccanAyahs,
  medinanAyahs,
  meccanSurahs,
  medinanSurahs,
}: OverviewCardsProps) {
  const t = useTranslations("cards");

  const cards = [
    {
      title: t("total_verses"),
      value: totalAyahs.toLocaleString(),
      desc: t("total_verses_desc"),
      icon: BookOpen,
    },
    {
      title: t("surahs"),
      value: totalSurahs.toString(),
      desc: t("surahs_desc"),
      icon: Layers,
    },
    {
      title: t("pages"),
      value: totalPages.toString(),
      desc: t("pages_desc"),
      icon: FileText,
    },
    {
      title: t("rukus"),
      value: totalRukus.toString(),
      desc: t("rukus_desc"),
      icon: BookMarked,
    },
    {
      title: t("sajda_verses"),
      value: totalSajdas.toString(),
      desc: t("sajda_verses_desc"),
      icon: CircleDot,
    },
    {
      title: t("meccan"),
      value: `${meccanSurahs} surahs · ${meccanAyahs.toLocaleString()} ayahs`,
      desc: t("meccan_desc"),
      icon: Sun,
    },
    {
      title: t("medinan"),
      value: `${medinanSurahs} surahs · ${medinanAyahs.toLocaleString()} ayahs`,
      desc: t("medinan_desc"),
      icon: Moon,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.desc}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
