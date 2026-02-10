'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Surah } from "@/types/quran";
import { useTranslations } from "next-intl";
import { useLocaleContext } from "@/lib/locale-context";

interface LongestShortestProps {
  longest: Surah[];
  shortest: Surah[];
}

export function LongestShortest({ longest, shortest }: LongestShortestProps) {
  const t = useTranslations();
  const { locale } = useLocaleContext();
  const isArabic = locale === "ar";

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.longest_surahs")}</CardTitle>
          <CardDescription>{t("dashboard.top_10")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>{t("dashboard.name")}</TableHead>
                <TableHead className="text-right">{t("dashboard.ayahs")}</TableHead>
                <TableHead>{t("dashboard.type")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {longest.map((s) => (
                <TableRow key={s.number}>
                  <TableCell className="font-medium">{s.number}</TableCell>
                  <TableCell>{isArabic ? s.name : s.englishName}</TableCell>
                  <TableCell className="text-right">{s.numberOfAyahs}</TableCell>
                  <TableCell>
                    <Badge variant={s.revelationType.toLowerCase() === "meccan" ? "default" : "secondary"}>
                      {t(`cards.${s.revelationType.toLowerCase()}`)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.shortest_surahs")}</CardTitle>
          <CardDescription>{t("dashboard.top_10")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>{t("dashboard.name")}</TableHead>
                <TableHead className="text-right">{t("dashboard.ayahs")}</TableHead>
                <TableHead>{t("dashboard.type")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shortest.map((s) => (
                <TableRow key={s.number}>
                  <TableCell className="font-medium">{s.number}</TableCell>
                  <TableCell>{isArabic ? s.name : s.englishName}</TableCell>
                  <TableCell className="text-right">{s.numberOfAyahs}</TableCell>
                  <TableCell>
                    <Badge variant={s.revelationType.toLowerCase() === "meccan" ? "default" : "secondary"}>
                      {t(`cards.${s.revelationType.toLowerCase()}`)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
