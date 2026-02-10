import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("dashboard");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("revelation_order_analysis")}</CardTitle>
        <CardDescription>{t("timeline_of_quran_revelation")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">{t("meccan_surahs")}</p>
              <p className="text-3xl font-bold">{data.meccanCount}</p>
              <Badge variant="outline">{Math.round((data.meccanCount / data.total) * 100)}% {t("of_total")}</Badge>
            </div>
            
            <div className="space-y-2 p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">{t("medinan_surahs")}</p>
              <p className="text-3xl font-bold">{data.medinanCount}</p>
              <Badge variant="outline">{Math.round((data.medinanCount / data.total) * 100)}% {t("of_total")}</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-accent/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{t("first_revealed")}</p>
              <p className="font-semibold mt-2">{data.firstRevealed}</p>
            </div>
            
            <div className="p-4 border rounded-lg bg-accent/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{t("last_revealed")}</p>
              <p className="font-semibold mt-2">{data.lastRevealed}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
  
