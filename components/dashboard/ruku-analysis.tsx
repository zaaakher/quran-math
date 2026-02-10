"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface RukuAnalysisProps {
  data: { ruku: number; ayahs: number }[];
}

export function RukuAnalysis({ data }: RukuAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ruku Distribution</CardTitle>
        <CardDescription>Verses per Ruku (reading sections) in the Quran</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="ruku" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip cursor={{ fill: "rgba(0,0,0,0.1)" }} />
            <Bar dataKey="ayahs" fill="hsl(var(--chart-3))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
