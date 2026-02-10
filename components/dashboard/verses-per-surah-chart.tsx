"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  verses: { label: "Verses", color: "var(--chart-1)" },
  number: { label: "Surah #", color: "var(--chart-2)" },
} satisfies ChartConfig;

interface VersesPerSurahChartProps {
  data: { name: string; number: number; verses: number; revelationType: string }[];
}

export function VersesPerSurahChart({ data }: VersesPerSurahChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verses per Surah</CardTitle>
        <CardDescription>Number of ayahs in each chapter (all 114 surahs)</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
