import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RevelationOrderProps {
  data: {
    total: number;
    meccanCount: number;
    medinanCount: number;
    firstRevealed: string;
    lastRevealed: string;
  };
}

export function RevelationOrder({ data }: RevelationOrderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revelation Order Analysis</CardTitle>
        <CardDescription>Timeline of Quran revelation (chronological order)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Meccan Surahs</p>
              <p className="text-3xl font-bold">{data.meccanCount}</p>
              <Badge variant="outline">{Math.round((data.meccanCount / data.total) * 100)}% of total</Badge>
            </div>
            
            <div className="space-y-2 p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Medinan Surahs</p>
              <p className="text-3xl font-bold">{data.medinanCount}</p>
              <Badge variant="outline">{Math.round((data.medinanCount / data.total) * 100)}% of total</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-accent/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">First Revealed</p>
              <p className="font-semibold mt-2">{data.firstRevealed}</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-accent/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Last Revealed</p>
              <p className="font-semibold mt-2">{data.lastRevealed}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
