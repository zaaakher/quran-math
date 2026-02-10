"use client";

import { useTranslations } from "next-intl";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import { ChartWrapper } from "./chart-wrapper";

const chartConfig = {
  meccan: { label: "meccan", color: "var(--chart-1)" },
  medinan: { label: "medinan", color: "var(--chart-2)" },
} satisfies ChartConfig;

interface RevelationChartProps {
  data: { name: string; ayahs: number; surahs: number; fill: string }[];
}

export function RevelationChart({ data }: RevelationChartProps) {
  const t = useTranslations("charts");
  return (
    <ChartWrapper
      title={t("revelation_type_ayahs")}
      description={t("revelation_type_desc")}
    >
      <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[280px]">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            data={data}
            dataKey="ayahs"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            strokeWidth={2}
            label={({ name, percent }) => `${t(name as "meccan" | "medinan")} ${((percent ?? 0) * 100).toFixed(1)}%`}
          />
        </PieChart>
      </ChartContainer>
    </ChartWrapper>
  );
}
