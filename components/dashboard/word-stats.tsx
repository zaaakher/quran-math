import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchFullQuran } from "@/lib/quran-api";
import { getLinguisticStats } from "@/lib/analysis";

export async function WordStats() {
  const fullQuranRes = await fetchFullQuran();
  const surahsWithAyahs = fullQuranRes?.code === 200 ? fullQuranRes.data?.surahs : [];
  const stats = getLinguisticStats(surahsWithAyahs);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Word & Letter Count</CardTitle>
        <CardDescription>Approximate from Arabic text</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">Total Words</p>
            <p className="text-3xl font-bold mt-2">{stats.totalWords.toLocaleString()}</p>
          </div>
          <div className="border rounded-lg p-4 bg-card">
            <p className="text-sm text-muted-foreground">Total Letters</p>
            <p className="text-3xl font-bold mt-2">{stats.totalLetters.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
