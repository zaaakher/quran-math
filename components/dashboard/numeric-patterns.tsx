'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

interface NumericPatternsProps {
  patterns: {
    perfectSquareVersesCount: number;
    primeVersesCount: number;
    fibonacciVersesCount: number;
  };
}

export function NumericPatterns({ patterns }: NumericPatternsProps) {
  const t = useTranslations("dashboard");
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("numeric_patterns")}</CardTitle>
        <CardDescription>{t("mathematical_patterns")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t("perfect_squares")}</p>
              <p className="text-xs text-muted-foreground">{t("eg_1_4_9_16_25")}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{patterns.perfectSquareVersesCount}</p>
              <Badge variant="outline" className="mt-2">{t("verses")}</Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t("prime_numbers")}</p>
              <p className="text-xs text-muted-foreground">{t("eg_2_3_5_7_11")}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{patterns.primeVersesCount}</p>
              <Badge variant="outline" className="mt-2">{t("verses")}</Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{t("fibonacci_numbers")}</p>
              <p className="text-xs text-muted-foreground">{t("eg_1_1_2_3_5_8")}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{patterns.fibonacciVersesCount}</p>
              <Badge variant="outline" className="mt-2">{t("verses")}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
