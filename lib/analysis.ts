import type { Surah, SajdaReference } from "@/types/quran";

export interface RevelationStats {
  meccan: number;
  medinan: number;
  meccanSurahs: number;
  medinanSurahs: number;
  meccanAyahs: number;
  medinanAyahs: number;
}

export function getRevelationStats(surahs: Surah[]): RevelationStats {
  let meccanSurahs = 0;
  let medinanSurahs = 0;
  let meccanAyahs = 0;
  let medinanAyahs = 0;
  for (const s of surahs) {
    if (s.revelationType === "Meccan") {
      meccanSurahs++;
      meccanAyahs += s.numberOfAyahs;
    } else {
      medinanSurahs++;
      medinanAyahs += s.numberOfAyahs;
    }
  }
  return {
    meccan: meccanAyahs,
    medinan: medinanAyahs,
    meccanSurahs,
    medinanSurahs,
    meccanAyahs,
    medinanAyahs,
  };
}

export function getVersesPerSurahChartData(surahs: Surah[]) {
  return surahs.map((s) => ({
    name: s.englishName,
    number: s.number,
    verses: s.numberOfAyahs,
    revelationType: s.revelationType,
  }));
}

export function getLongestSurahs(surahs: Surah[], n = 10) {
  return [...surahs].sort((a, b) => b.numberOfAyahs - a.numberOfAyahs).slice(0, n);
}

export function getShortestSurahs(surahs: Surah[], n = 10) {
  return [...surahs].sort((a, b) => a.numberOfAyahs - b.numberOfAyahs).slice(0, n);
}

export function getRevelationChartData(surahs: Surah[]) {
  const stats = getRevelationStats(surahs);
  return [
    { name: "Meccan", ayahs: stats.meccanAyahs, surahs: stats.meccanSurahs, fill: "var(--chart-1)" },
    { name: "Medinan", ayahs: stats.medinanAyahs, surahs: stats.medinanSurahs, fill: "var(--chart-2)" },
  ];
}

/** Build chart data from Juz API responses (number of ayahs per juz). */
export function getJuzDistributionFromApi(
  juzList: { number: number; ayahs: unknown[] }[]
): { juz: number; ayahs: number; name: string }[] {
  return juzList.map((j) => ({
    juz: j.number,
    ayahs: j.ayahs?.length ?? 0,
    name: `Juz ${j.number}`,
  }));
}

export function getAyahCountStats(surahs: Surah[]) {
  const counts = surahs.map((s) => s.numberOfAyahs);
  const total = counts.reduce((a, b) => a + b, 0);
  const sorted = [...counts].sort((a, b) => a - b);
  const median =
    sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1]! + sorted[sorted.length / 2]!) / 2
      : sorted[Math.floor(sorted.length / 2)]!;
  const avg = total / counts.length;
  const min = Math.min(...counts);
  const max = Math.max(...counts);

  return { total, avg, median, min, max, surahCount: surahs.length };
}

export function getSajdaStats(sajdas: SajdaReference[]) {
  const obligatory = sajdas.filter((s) => s.obligatory).length;
  const recommended = sajdas.filter((s) => s.recommended && !s.obligatory).length;
  return { total: sajdas.length, obligatory, recommended };
}

/** Count words (space-separated) and letters (non-space chars) in Arabic text */
export function countWordsAndLetters(arabicText: string) {
  const normalized = arabicText.replace(/\s+/g, " ").trim();
  const words = normalized ? normalized.split(" ").length : 0;
  const letters = normalized ? normalized.replace(/\s/g, "").length : 0;
  return { words, letters };
}
