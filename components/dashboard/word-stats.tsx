import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchFullQuran } from "@/lib/quran-api";
import { countWordsAndLetters } from "@/lib/analysis";

export async function WordStats() {
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
          <CardTitle>Word & letter count (Uthmani)</CardTitle>
          <CardDescription>Approximate from Arabic text</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total words</span>
            <span className="font-medium">{totalWords.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total letters</span>
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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Word & letter count</CardTitle>
        <CardDescription>Arabic text analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Loading…</p>
      </CardContent>
    </Card>
  );
}
