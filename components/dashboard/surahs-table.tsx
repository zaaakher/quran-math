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
import { useTranslations } from "next-intl";

interface SurahsTableProps {
  surahs: Surah[];
}

export function SurahsTable({ surahs }: SurahsTableProps) {
  const t = useTranslations("dashboard");
  let runningTotal = 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("all_surahs")}</CardTitle>
        <CardDescription>{t("name_verse_count_revelation_type")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">#</TableHead>
                <TableHead>{t("english_name")}</TableHead>
                <TableHead>{t("translation")}</TableHead>
                <TableHead className="text-right">{t("ayahs")}</TableHead>
                <TableHead>{t("type")}</TableHead>
                <TableHead className="text-right">{t("cumulative")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {surahs.map((s) => {
                runningTotal += s.numberOfAyahs;
                return (
                  <TableRow key={s.number}>
                    <TableCell className="font-medium">{s.number}</TableCell>
                    <TableCell>{s.englishName}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {s.englishNameTranslation}
                    </TableCell>
                    <TableCell className="text-right">{s.numberOfAyahs}</TableCell>
                    <TableCell>
                      <Badge variant={s.revelationType === "Meccan" ? "default" : "secondary"}>
                        {s.revelationType}
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
    </Card>
  );
}
