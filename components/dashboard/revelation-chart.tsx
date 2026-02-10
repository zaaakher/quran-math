"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import { ChartWrapper } from "./chart-wrapper";

const chartConfig = {
  meccan: { label: "Meccan", color: "var(--chart-1)" },
  medinan: { label: "Medinan", color: "var(--chart-2)" },
} satisfies ChartConfig;

interface RevelationChartProps {
  data: { name: string; ayahs: number; surahs: number; fill: string }[];
}

export function RevelationChart({ data }: RevelationChartProps) {
  return (
    <ChartWrapper
      title="Revelation Type (Ayahs)"
      description="Meccan vs Medinan verses"
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
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(1)}%`}
          />
        </PieChart>
      </ChartContainer>
    </ChartWrapper>
  );
}
