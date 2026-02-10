"use client";

import { useTranslations } from "next-intl";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartWrapper } from "./chart-wrapper";

interface RukuAnalysisProps {
  data: { ruku: number; ayahs: number }[];
}

export function RukuAnalysis({ data }: RukuAnalysisProps) {
  const t = useTranslations("charts");
  return (
    <ChartWrapper
      title={t("ruku_distribution")}
      description={t("ruku_distribution_desc")}
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
