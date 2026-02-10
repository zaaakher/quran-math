import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

interface SurahCharacteristicsProps {
  data: {
    total: number;
    makkahSurahs: number;
    madinahSurahs: number;
    longestSurahName: string;
    longestSurahVerses: number;
    shortestSurahName: string;
    shortestSurahVerses: number;
  };
}

export function SurahCharacteristics({ data }: SurahCharacteristicsProps) {
  const t = useTranslations("dashboard");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("surah_characteristics")}</CardTitle>
        <CardDescription>{t("overview_of_all_surahs")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">{t("total_surahs")}</p>
              <p className="text-3xl font-bold mt-2">{data.total}</p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">{t("makkah_madinah")}</p>
              <p className="text-lg font-bold mt-2">{data.makkahSurahs} / {data.madinahSurahs}</p>
            </div>
          </div>
          
          <div className="border-t pt-4 space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">🕌 {t("longest_surah")}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="font-medium">{data.longestSurahName}</span>
                <Badge>{data.longestSurahVerses} {t("verses")}</Badge>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">📖 {t("shortest_surah")}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="font-medium">{data.shortestSurahName}</span>
                <Badge variant="outline">{data.shortestSurahVerses} {t("verses")}</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
