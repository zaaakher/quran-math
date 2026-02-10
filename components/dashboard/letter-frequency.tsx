"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

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
    <Card>
      <CardHeader>
        <CardTitle>Letter Frequency Analysis</CardTitle>
        <CardDescription>Most common Arabic letters in the Quran</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
