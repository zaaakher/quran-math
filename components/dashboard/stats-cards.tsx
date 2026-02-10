import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AyahCountStats {
  total: number;
  avg: number;
  median: number;
  min: number;
  max: number;
  surahCount: number;
}

interface StatsCardsProps {
  ayahStats: AyahCountStats;
  sajdaTotal: number;
  sajdaObligatory: number;
  sajdaRecommended: number;
}

export function StatsCards({
  ayahStats,
  sajdaTotal,
  sajdaObligatory,
  sajdaRecommended,
}: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Ayah count statistics</CardTitle>
          <CardDescription>Per-surah verse distribution</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total ayahs</span>
            <span className="font-medium">{ayahStats.total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Average per surah</span>
            <span className="font-medium">{ayahStats.avg.toFixed(1)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Median per surah</span>
            <span className="font-medium">{ayahStats.median}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shortest surah (ayahs)</span>
            <span className="font-medium">{ayahStats.min}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Longest surah (ayahs)</span>
            <span className="font-medium">{ayahStats.max}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sajda breakdown</CardTitle>
          <CardDescription>Prostration verse types</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total sajda verses</span>
            <span className="font-medium">{sajdaTotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Obligatory</span>
            <span className="font-medium">{sajdaObligatory}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Recommended</span>
            <span className="font-medium">{sajdaRecommended}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
