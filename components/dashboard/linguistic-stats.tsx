import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LinguisticStatsProps {
  stats: {
    totalWords: number;
    totalLetters: number;
    uniqueWords: number;
    averageWordLength: number;
    typeTokenRatio: number;
  };
}

export function LinguisticStats({ stats }: LinguisticStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Linguistic Statistics</CardTitle>
        <CardDescription>Comprehensive text analysis of the Quran</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Words</p>
            <p className="text-2xl font-bold">{stats.totalWords.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Unique Words</p>
            <p className="text-2xl font-bold">{stats.uniqueWords.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Total Letters</p>
            <p className="text-2xl font-bold">{stats.totalLetters.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Avg Word Length</p>
            <p className="text-2xl font-bold">{stats.averageWordLength} chars</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Type-Token Ratio</p>
            <p className="text-2xl font-bold">{stats.typeTokenRatio}%</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Word Diversity</p>
            <Badge variant="secondary">
              {stats.uniqueWords / stats.totalWords > 0.15 ? "High" : "Moderate"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
