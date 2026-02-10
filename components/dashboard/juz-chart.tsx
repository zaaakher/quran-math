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
  ayahs: { label: "Ayahs", color: "var(--chart-3)" },
  juz: { label: "Juz", color: "var(--chart-4)" },
} satisfies ChartConfig;

interface JuzChartProps {
  data: { juz: number; ayahs: number; name: string }[];
}

export function JuzChart({ data }: JuzChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ayahs per Juz</CardTitle>
        <CardDescription>30 Juz (parts) — traditional division for recitation</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={data} margin={{ left: 0, right: 12 }}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis dataKey="ayahs" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="ayahs" radius={[4, 4, 0, 0]} fill="var(--chart-3)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
