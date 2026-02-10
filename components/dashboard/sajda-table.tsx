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
import type { SajdaReference } from "@/types/quran";
import { useTranslations } from "next-intl";

interface SajdaTableProps {
  sajdas: SajdaReference[];
  surahNames: Map<number, string>;
}

export function SajdaTable({ sajdas, surahNames }: SajdaTableProps) {
  const t = useTranslations("dashboard");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("sajda_prostration_verses")}</CardTitle>
        <CardDescription>
          {sajdas.length} {t("verses_where_prostration")} {t("recommended_or_obligatory")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>{t("surah")}</TableHead>
              <TableHead>{t("ayah")}</TableHead>
              <TableHead>{t("reference")}</TableHead>
              <TableHead>{t("type")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sajdas.map((s, i) => (
              <TableRow key={`${s.surah}-${s.ayah}`}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{surahNames.get(s.surah) ?? `${s.surah}`}</TableCell>
                <TableCell>{s.ayah}</TableCell>
                <TableCell className="font-mono">
                  {s.surah}:{s.ayah}
                </TableCell>
                <TableCell>
                  {s.obligatory ? (
                    <Badge variant="destructive">{t("obligatory")}</Badge>
                  ) : (
                    <Badge variant="secondary">{t("recommended")}</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
