"use client";

import { useTranslations } from "next-intl";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartWrapper } from "./chart-wrapper";

interface WordLengthProps {
  data: { length: number; count: number }[];
}

export function WordLengthDistribution({ data }: WordLengthProps) {
  const t = useTranslations("charts");
  return (
    <ChartWrapper
      title={t("word_length")}
      description={t("word_length_desc")}
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
