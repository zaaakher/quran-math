import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AyahStatsProps {
  stats: {
    avg: number;
    min: number;
    max: number;
    median: number;
  };
}

export function AyahStats({ stats }: AyahStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verse Length Analysis</CardTitle>
        <CardDescription>Character count distribution in verses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Average Length</p>
            <p className="text-2xl font-bold">{stats.avg}</p>
            <Badge variant="secondary" className="text-xs">Characters</Badge>
          </div>
          
          <div className="space-y-2 p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Median Length</p>
            <p className="text-2xl font-bold">{Math.round(stats.median)}</p>
            <Badge variant="secondary" className="text-xs">Characters</Badge>
          </div>
          
          <div className="space-y-2 p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Longest Verse</p>
            <p className="text-2xl font-bold">{stats.max}</p>
            <Badge variant="secondary" className="text-xs">Characters</Badge>
          </div>
          
          <div className="space-y-2 p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">Shortest Verse</p>
            <p className="text-2xl font-bold">{stats.min}</p>
            <Badge variant="secondary" className="text-xs">Characters</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
