"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartWrapper } from "./chart-wrapper";

interface RukuAnalysisProps {
  data: { ruku: number; ayahs: number }[];
}

export function RukuAnalysis({ data }: RukuAnalysisProps) {
  return (
    <ChartWrapper
      title="Ruku Distribution"
      description="Verses per Ruku (reading sections) in the Quran"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="ruku" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.1)" }} />
          <Bar dataKey="ayahs" fill="hsl(var(--chart-3))" />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
