"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartWrapper } from "./chart-wrapper";

interface LetterFrequencyProps {
  data: { letter: string; count: number }[];
}

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function LetterFrequency({ data }: LetterFrequencyProps) {
  return (
    <ChartWrapper
      title="Letter Frequency Analysis"
      description="Most common Arabic letters in the Quran"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="letter" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.1)" }} />
          <Bar dataKey="count" fill="hsl(var(--chart-1))">
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
