"use client";

import { useTranslations } from "next-intl";
import { LabelList, Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


interface RevelationChartProps {
  data: { name: string; ayahs: number; surahs: number; fill: string }[];
}

export function RevelationChart({ data }: RevelationChartProps) {
  const t = useTranslations();

  const chartConfig = {
    meccan: { label: t("charts.meccan"), color: "var(--chart-1)" },
    medinan: { label: t("charts.medinan"), color: "var(--chart-2)" },
  } satisfies ChartConfig;
  // Calculate total ayahs
  const totalAyahs = data.reduce((acc, item) => acc + item.ayahs, 0);
  const meccanData = data.find((d) => d.name === "meccan");
  const medinanData = data.find((d) => d.name === "medinan");

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{t("charts.revelation_type_ayahs")}</CardTitle>
        <CardDescription>{t("charts.revelation_type_desc")}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="name" hideLabel />}
            />
            <Pie
              data={data}
              dataKey="ayahs"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={0}
              strokeWidth={2}
            >
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: unknown) =>
                  t(`charts.${value}` as "meccan" | "medinan")
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {t("dashboard.total_ayahs")}: {totalAyahs.toLocaleString()}
        </div>
        <div className="text-muted-foreground leading-none flex gap-4">
          <span>{t("charts.meccan")}: {meccanData?.ayahs.toLocaleString()}</span>
          <span>{t("charts.medinan")}: {medinanData?.ayahs.toLocaleString()}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
