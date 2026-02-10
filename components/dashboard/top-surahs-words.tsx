'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

interface TopSurahsByWordsProps {
  data: Array<{
    surahNumber: number;
    surahName: string;
    words: number;
    ayahs: number;
  }>;
}

export function TopSurahsByWords({ data }: TopSurahsByWordsProps) {
  const t = useTranslations("dashboard");
  
  return (
    <Card className="max-h-96 overflow-y-auto">
      <CardHeader>
        <CardTitle>{t("top_surahs_by_word_count")}</CardTitle>
        <CardDescription>{t("surahs_with_most_words")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("surah")}</TableHead>
                <TableHead className="text-right">{t("words")}</TableHead>
                <TableHead className="text-right">{t("verses")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((surah) => (
                <TableRow key={surah.surahNumber}>
                  <TableCell>
                    <div className="flex flex-row items-center gap-1">
                      <p className="font-medium">{surah.surahName}</p>
                      <Badge variant="outline" className="text-xs mt-1">#{surah.surahNumber}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{surah.words.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{surah.ayahs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
