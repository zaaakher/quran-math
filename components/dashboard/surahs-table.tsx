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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Surah } from "@/types/quran";
import { useLocale, useTranslations } from "next-intl";

interface SurahsTableProps {
  surahs: Surah[];
}

export function SurahsTable({ surahs }: SurahsTableProps) {
  const t = useTranslations();
  const locale = useLocale(); // Ensure locale is available for translations
  let runningTotal = 0;

  return (
    <Card dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <CardHeader className="text-start" >
        <CardTitle>{t("dashboard.all_surahs")}</CardTitle>
        <CardDescription>{t("dashboard.name_verse_count_revelation_type")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-md border">
          <Table dir={locale === 'ar' ? 'rtl' : 'ltr'} className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">#</TableHead>
                <TableHead>{t("dashboard.surah")}</TableHead>
                {/* <TableHead>{t("dashboard.translation")}</TableHead> */}
                <TableHead className="text-right">{t("dashboard.ayahs")}</TableHead>
                <TableHead>{t("dashboard.type")}</TableHead>
                <TableHead className="text-right">{t("dashboard.cumulative")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {surahs.map((s) => {
                runningTotal += s.numberOfAyahs;
                return (
                  <TableRow key={s.number}>
                    <TableCell className="font-medium">{s.number}</TableCell>
                    <TableCell>{s[locale === 'en' ? 'englishName' : 'name']}</TableCell>

                    <TableCell className="text-right">{s.numberOfAyahs}</TableCell>
                    <TableCell>
                      <Badge variant={s.revelationType.toLowerCase() === "meccan" ? "default" : "secondary"}>
                        {t(`cards.${s.revelationType.toLowerCase()}`)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{runningTotal}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card >
  );
}
