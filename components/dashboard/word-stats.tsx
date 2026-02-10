import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchFullQuran } from "@/lib/quran-api";
import { getLinguisticStats } from "@/lib/analysis";

export async function WordStats() {
  const t = await getTranslations("dashboard");
  const fullQuranRes = await fetchFullQuran();
  const surahsWithAyahs = fullQuranRes?.code === 200 ? fullQuranRes.data?.surahs : [];
  const stats = getLinguisticStats(surahsWithAyahs);

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
            <p className="text-3xl font-bold mt-2">{stats.totalWords.toLocaleString()}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">{t("total_letters")}</p>
            <p className="text-3xl font-bold mt-2">{stats.totalLetters.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
