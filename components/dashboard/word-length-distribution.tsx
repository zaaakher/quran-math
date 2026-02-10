"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartWrapper } from "./chart-wrapper";

interface WordLengthProps {
  data: { length: number; count: number }[];
}

export function WordLengthDistribution({ data }: WordLengthProps) {
  return (
    <ChartWrapper
      title="Word Length Distribution"
      description="Distribution of Arabic word lengths in the Quran"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="length" />
          <YAxis />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.1)" }} />
          <Bar dataKey="count" fill="hsl(var(--chart-2))" />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
