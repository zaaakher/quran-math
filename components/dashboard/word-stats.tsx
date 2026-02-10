import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchFullQuran } from "@/lib/quran-api";
import { countWordsAndLetters } from "@/lib/analysis";
import { useTranslations } from "next-intl";

export async function WordStats() {
  const t = useTranslations("dashboard");
  
  try {
    const res = await fetchFullQuran("quran-uthmani");
    if (res.code !== 200 || !res.data?.surahs) {
      return <WordStatsFallback />;
    }
    let totalWords = 0;
    let totalLetters = 0;
    for (const surah of res.data.surahs) {
      for (const ayah of surah.ayahs || []) {
        const text = ayah.text?.replace(/\ufeff/g, "").trim() ?? "";
        const { words, letters } = countWordsAndLetters(text);
        totalWords += words;
        totalLetters += letters;
      }
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("word_letter_count")}</CardTitle>
          <CardDescription>{t("approximate_from_arabic_text")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("total_words")}</span>
            <span className="font-medium">{totalWords.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("total_letters")}</span>
            <span className="font-medium">{totalLetters.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    );
  } catch {
    return <WordStatsFallback />;
  }
}

function WordStatsFallback() {
  const t = useTranslations("dashboard");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("word_letter_count")}</CardTitle>
        <CardDescription>{t("arabic_text_analysis")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{t("loading")}</p>
      </CardContent>
    </Card>
  );
}
