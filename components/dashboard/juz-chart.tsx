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
  ayahs: { label: "Ayahs", color: "var(--chart-3)" },
  juz: { label: "Juz", color: "var(--chart-4)" },
} satisfies ChartConfig;

interface JuzChartProps {
  data: { juz: number; ayahs: number; name: string }[];
}

export function JuzChart({ data }: JuzChartProps) {
  return (
    <ChartWrapper
      title="Ayahs per Juz"
      description="30 Juz (parts) — traditional division for recitation"
    >
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart data={data} margin={{ left: 0, right: 12 }}>
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis dataKey="ayahs" tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="ayahs" radius={[4, 4, 0, 0]} fill="var(--chart-3)" />
        </BarChart>
      </ChartContainer>
    </ChartWrapper>
  );
}
