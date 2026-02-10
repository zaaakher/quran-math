"use client";

import { useEffect, useState } from "react";
import { useQuranStore } from "@/lib/store";
import { fetchSurahList, fetchMeta, fetchAllJuz, fetchFullQuran } from "@/lib/quran-api";
import {
  getRevelationStats,
  getRevelationChartData,
  getVersesPerSurahChartData,
  getJuzDistributionFromApi,
  getLongestSurahs,
  getShortestSurahs,
  getAyahCountStats,
  getSajdaStats,
  getLetterFrequency,
  getWordLengthDistribution,
  getRukuDistribution,
  getPageDistribution,
  getAyahLengthStats,
  getTopSurahsByWordCount,
  getRevelationOrder,
  getAverageVersesPerPage,
  getLinguisticStats,
  getNumericPatterns,
  getSurahCharacteristics,
} from "@/lib/analysis";
import { OverviewCards } from "@/components/dashboard/overview-cards";
import { RevelationChart } from "@/components/dashboard/revelation-chart";
import { VersesPerSurahChart } from "@/components/dashboard/verses-per-surah-chart";
import { JuzChart } from "@/components/dashboard/juz-chart";
import { SurahsTable } from "@/components/dashboard/surahs-table";
import { LongestShortest } from "@/components/dashboard/longest-shortest";
import { SajdaTable } from "@/components/dashboard/sajda-table";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { WordStats } from "@/components/dashboard/word-stats";
import { LetterFrequency } from "@/components/dashboard/letter-frequency";
import { WordLengthDistribution } from "@/components/dashboard/word-length-distribution";
import { LinguisticStats } from "@/components/dashboard/linguistic-stats";
import { NumericPatterns } from "@/components/dashboard/numeric-patterns";
import { AyahStats } from "@/components/dashboard/ayah-stats";
import { TopSurahsByWords } from "@/components/dashboard/top-surahs-words";
import { RevelationOrder } from "@/components/dashboard/revelation-order";
import { RukuAnalysis } from "@/components/dashboard/ruku-analysis";
import { SurahCharacteristics } from "@/components/dashboard/surah-characteristics";
import { PageDistribution } from "@/components/dashboard/page-distribution";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DashboardSection } from "@/components/dashboard-section";
import { ErrorDisplay } from "@/components/error-display";
import { useTranslations } from "next-intl";

interface DashboardPageContentProps {
  locale: string;
}

export function DashboardPageContent({ locale }: DashboardPageContentProps) {
  const t = useTranslations('dashboard');

  const { surahs, ayahs, juzs, isLoading, error } = useQuranStore();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function processData() {
      if (surahs.length > 0 && ayahs.length > 0 && juzs.length > 0) {
        try {
          // Fetch meta data including sajdas and rukus
          const metaRes = await fetchMeta();
          const meta = metaRes?.data;

          // Build surahs with ayahs structure for analysis functions
          const surahsWithAyahs = surahs.map(surah => ({
            ...surah,
            ayahs: ayahs.filter(ayah => {
              // Calculate which surah this ayah belongs to based on cumulative ayah counts
              const startAyah = surahs.slice(0, surah.number - 1).reduce((sum, s) => sum + s.numberOfAyahs, 1);
              const endAyah = startAyah + surah.numberOfAyahs - 1;
              return ayah.number >= startAyah && ayah.number <= endAyah;
            })
          }));

          const revelationStats = getRevelationStats(surahs);
          const revelationChartData = getRevelationChartData(surahs);
          const versesPerSurahData = getVersesPerSurahChartData(surahs, locale);
          const juzData = getJuzDistributionFromApi(juzs);
          const longest = getLongestSurahs(surahs, 10);
          const shortest = getShortestSurahs(surahs, 10);
          const ayahStats = getAyahCountStats(surahs);

          const sajdas = meta?.sajdas?.references ?? [];
          const sajdaStats = getSajdaStats(sajdas);
          const surahNames = new Map(surahs.map((s) => [s.number, locale === "en" ? s.englishName : s.name]));

          // New advanced analysis - now passing proper surahsWithAyahs structure
          const letterFreq = getLetterFrequency(surahs, surahsWithAyahs);
          const wordLengthDist = getWordLengthDistribution(surahsWithAyahs);
          const rukuDist = getRukuDistribution(surahsWithAyahs);
          const pageDist = getPageDistribution(surahsWithAyahs);
          const ayahLengthStats = getAyahLengthStats(surahsWithAyahs);
          const topSurahsByWords = getTopSurahsByWordCount(surahsWithAyahs, 15, locale);
          const revelationOrder = getRevelationOrder(surahs, locale);
          const avgVersesPerPage = getAverageVersesPerPage(surahsWithAyahs);
          const linguisticStats = getLinguisticStats(surahsWithAyahs);
          const numericPatterns = getNumericPatterns(surahsWithAyahs);
          const surahCharacteristics = getSurahCharacteristics(surahs, locale);
          const wordStats = {
            totalWords: linguisticStats.totalWords,
            totalLetters: linguisticStats.totalLetters
          };

          setData({
            surahs,
            meta,
            revelationStats,
            revelationChartData,
            versesPerSurahData,
            juzData,
            longest,
            shortest,
            ayahStats,
            sajdas,
            sajdaStats,
            surahNames,
            letterFreq,
            wordLengthDist,
            rukuDist,
            pageDist,
            ayahLengthStats,
            topSurahsByWords,
            revelationOrder,
            avgVersesPerPage,
            linguisticStats,
            numericPatterns,
            surahCharacteristics,
            wordStats,
          });
        } catch (err) {
          console.error("Error processing dashboard data:", err);
        }
      }
    }
    processData();
  }, [surahs, ayahs, juzs, locale]);


  // If no data is available yet, don't render anything (should be handled by wrapper)
  if (!data) {
    return null;
  }

  const {
    meta,
    revelationStats,
    revelationChartData,
    versesPerSurahData,
    juzData,
    longest,
    shortest,
    ayahStats,
    sajdas,
    sajdaStats,
    surahNames,
    letterFreq,
    wordLengthDist,
    rukuDist,
    pageDist,
    ayahLengthStats,
    topSurahsByWords,
    revelationOrder,
    avgVersesPerPage,
    linguisticStats,
    numericPatterns,
    surahCharacteristics,
    wordStats,
  } = data;

  return (
    <div className="py-8 space-y-8 px-4">
      <section id="overview" className="pt-0">
        <DashboardSection titleKey={"overview"} showSeparator={false}>
          <OverviewCards
            totalAyahs={meta?.ayahs?.count ?? revelationStats.meccan + revelationStats.medinan}
            totalSurahs={surahs.length}
            totalPages={604}
            totalRukus={meta?.rukus?.count ?? 556}
            totalSajdas={meta?.sajdas?.count ?? sajdas.length}
            meccanAyahs={revelationStats.meccanAyahs}
            medinanAyahs={revelationStats.medinanAyahs}
            meccanSurahs={revelationStats.meccanSurahs}
            medinanSurahs={revelationStats.medinanSurahs}
            avgVersesPerPage={avgVersesPerPage}
          />
        </DashboardSection>
      </section>

      <DashboardSection titleKey="revelation" id="revelation">
        <div className="grid gap-4 lg:grid-cols-2">
          <RevelationChart data={revelationChartData} />
          <div className="space-y-4">
            <StatsCards
              ayahStats={ayahStats}
              sajdaTotal={sajdaStats.total}
              sajdaObligatory={sajdaStats.obligatory}
              sajdaRecommended={sajdaStats.recommended}
            />
            <WordStats totalWords={wordStats.totalWords} totalLetters={wordStats.totalLetters} />
          </div>
        </div>
      </DashboardSection>

      <DashboardSection titleKey="revelation_order" id="revelation-order">
        <RevelationOrder data={revelationOrder} />
      </DashboardSection>

      <DashboardSection titleKey="surahs" id="surahs">
        <div className="grid gap-4">
          <SurahCharacteristics data={surahCharacteristics} />
          <LongestShortest longest={longest} shortest={shortest} />
        </div>
      </DashboardSection>

      <DashboardSection titleKey="verses" id="verses">
        <div className="grid gap-4 lg:grid-cols-2">
          <AyahStats stats={ayahLengthStats} />
          <TopSurahsByWords data={topSurahsByWords} />
        </div>
      </DashboardSection>

      <DashboardSection titleKey="word_analysis" id="word-analysis">
        <div className="grid gap-4 space-y-4">
          <LinguisticStats stats={linguisticStats} />
          <div className="grid gap-4 lg:grid-cols-2">
            <LetterFrequency data={letterFreq} />
            <WordLengthDistribution data={wordLengthDist} />
          </div>
        </div>
      </DashboardSection>

      <DashboardSection titleKey="numeric" id="numeric">
        <div className="grid gap-4 lg:grid-cols-1">
          <NumericPatterns patterns={numericPatterns} />

        </div>
      </DashboardSection>

      <DashboardSection titleKey="juz" id="juz">
        <JuzChart data={juzData} />
      </DashboardSection>

      <DashboardSection titleKey="ruku" id="ruku">
        <RukuAnalysis data={rukuDist} />
      </DashboardSection>

      <DashboardSection titleKey="pages" id="pages">
        <PageDistribution data={pageDist} />
      </DashboardSection>

      <DashboardSection titleKey="verses_per_surah" id="verses-per-surah">
        <VersesPerSurahChart data={versesPerSurahData} />
      </DashboardSection>

      <DashboardSection titleKey="sajda" id="sajda">
        <Tabs defaultValue="surahs">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="surahs">{t("all_surahs")}</TabsTrigger>
            <TabsTrigger value="sajda">{t("sajda_verses")}</TabsTrigger>
          </TabsList>
          <TabsContent value="surahs" className="mt-4">
            <SurahsTable surahs={surahs} />
          </TabsContent>
          <TabsContent value="sajda" className="mt-4">
            <SajdaTable sajdas={sajdas} surahNames={surahNames} />
          </TabsContent>
        </Tabs>
      </DashboardSection>
    </div>
  );
}
