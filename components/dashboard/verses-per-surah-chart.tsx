"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartWrapper } from "./chart-wrapper";

const chartConfig = {
  verses: { label: "Verses", color: "var(--chart-1)" },
  number: { label: "Surah #", color: "var(--chart-2)" },
} satisfies ChartConfig;

interface VersesPerSurahChartProps {
  data: { name: string; number: number; verses: number; revelationType: string }[];
}

export function VersesPerSurahChart({ data }: VersesPerSurahChartProps) {
  return (
    <ChartWrapper
      title="Verses per Surah"
      description="Number of ayahs in each chapter (all 114 surahs)"
    >
      <ChartContainer config={chartConfig} className="h-[400px] w-full">
        <BarChart data={data} margin={{ left: 0, right: 12 }}>
          <XAxis
            dataKey="number"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `S${v}`}
          />
          <YAxis dataKey="verses" tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="verses" radius={[4, 4, 0, 0]} fill="var(--chart-1)" />
        </BarChart>
      </ChartContainer>
    </ChartWrapper>
  );
}
