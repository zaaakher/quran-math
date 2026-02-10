import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

interface AyahStatsProps {
  stats: {
    avg: number;
    min: number;
    max: number;
    median: number;
  };
}

export function AyahStats({ stats }: AyahStatsProps) {
  const t = useTranslations("dashboard");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("verse_length_analysis")}</CardTitle>
        <CardDescription>{t("character_count_distribution")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">{t("average_length")}</p>
            <p className="text-2xl font-bold">{stats.avg}</p>
            <Badge variant="secondary" className="text-xs">{t("characters")}</Badge>
          </div>
          
          <div className="space-y-2 p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">{t("median_length")}</p>
            <p className="text-2xl font-bold">{Math.round(stats.median)}</p>
            <Badge variant="secondary" className="text-xs">{t("characters")}</Badge>
          </div>
          
          <div className="space-y-2 p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">{t("longest_verse")}</p>
            <p className="text-2xl font-bold">{stats.max}</p>
            <Badge variant="secondary" className="text-xs">{t("characters")}</Badge>
          </div>
          
          <div className="space-y-2 p-4 border rounded-lg">
            <p className="text-sm text-muted-foreground">{t("shortest_verse")}</p>
            <p className="text-2xl font-bold">{stats.min}</p>
            <Badge variant="secondary" className="text-xs">{t("characters")}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
