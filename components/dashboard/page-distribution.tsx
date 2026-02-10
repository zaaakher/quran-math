"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ChartWrapper } from "./chart-wrapper";

interface PageDistributionProps {
  data: { page: number; ayahs: number }[];
}

export function PageDistribution({ data }: PageDistributionProps) {
  // Limit data for better visualization
  const displayData = data.length > 100 ? data.filter((_, i) => i % Math.ceil(data.length / 100) === 0) : data;
  
  return (
    <ChartWrapper
      title="Page Distribution"
      description="Verses per Quran page (Standard 604-page edition)"
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={displayData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="page" />
          <YAxis />
          <Tooltip cursor={{ stroke: "rgba(0,0,0,0.2)" }} />
          <Line
            type="monotone"
            dataKey="ayahs"
            stroke="hsl(var(--chart-4))"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
