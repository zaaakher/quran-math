"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface WordLengthProps {
  data: { length: number; count: number }[];
}

export function WordLengthDistribution({ data }: WordLengthProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Word Length Distribution</CardTitle>
        <CardDescription>Distribution of Arabic word lengths in the Quran</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="length" />
            <YAxis />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.1)" }} />
            <Bar dataKey="count" fill="hsl(var(--chart-2))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
