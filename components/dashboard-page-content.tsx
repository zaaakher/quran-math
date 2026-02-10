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

interface DashboardPageContentProps {
  locale: string;
}

export function DashboardPageContent({ locale }: DashboardPageContentProps) {
  const { surahs, ayahs, juzs, isLoading, error } = useQuranStore();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (surahs.length > 0 && ayahs.length > 0 && juzs.length > 0) {
      try {
        // Get meta data from surahs
        const meta = {
          ayahs: { count: ayahs.length },
          surahs: { count: surahs.length, references: surahs },
          sajdas: { count: 0, references: [] },
          rukus: { count: 0, references: [] }
        };

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

        // New advanced analysis
        const letterFreq = getLetterFrequency(surahs, ayahs);
        const wordLengthDist = getWordLengthDistribution(ayahs);
        const rukuDist = getRukuDistribution(ayahs);
        const pageDist = getPageDistribution(ayahs);
        const ayahLengthStats = getAyahLengthStats(ayahs);
        const topSurahsByWords = getTopSurahsByWordCount(ayahs, 15, locale);
        const revelationOrder = getRevelationOrder(surahs, locale);
        const avgVersesPerPage = getAverageVersesPerPage(ayahs);
        const linguisticStats = getLinguisticStats(ayahs);
        const numericPatterns = getNumericPatterns(ayahs);
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
  }, [surahs, ayahs, juzs, locale]);

  if (error) {
    return <ErrorDisplay messageKey="failed_load" namespace="common" />;
  }

  if (isLoading || !data) {
    return (
      <div className="py-8 space-y-8 px-4">
        <section id="overview" className="pt-0">
          <DashboardSection titleKey={"overview"} showSeparator={false}>
            <OverviewCards
              totalAyahs={0}
              totalSurahs={0}
              totalPages={604}
              totalRukus={0}
              totalSajdas={0}
              meccanAyahs={0}
              medinanAyahs={0}
              meccanSurahs={0}
              medinanSurahs={0}
            />
          </DashboardSection>
        </section>

        <DashboardSection titleKey="revelation">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="h-64 bg-muted rounded-lg animate-pulse" />
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-card animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                <div className="h-8 bg-muted rounded w-16" />
              </div>
              <div className="border rounded-lg p-4 bg-card animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                <div className="h-8 bg-muted rounded w-16" />
              </div>
            </div>
          </div>
        </DashboardSection>

        <DashboardSection titleKey="revelation_order">
          <div className="h-64 bg-muted rounded-lg animate-pulse" />
        </DashboardSection>

        <DashboardSection titleKey="surahs">
          <div className="grid gap-4">
            <div className="h-64 bg-muted rounded-lg animate-pulse" />
            <div className="h-64 bg-muted rounded-lg animate-pulse" />
          </div>
        </DashboardSection>

        <DashboardSection titleKey="verses">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="h-64 bg-muted rounded-lg animate-pulse" />
            <div className="h-64 bg-muted rounded-lg animate-pulse" />
          </div>
        </DashboardSection>

        <DashboardSection titleKey="word_analysis">
          <div className="grid gap-4 space-y-4">
            <div className="h-64 bg-muted rounded-lg animate-pulse" />
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="h-64 bg-muted rounded-lg animate-pulse" />
              <div className="h-64 bg-muted rounded-lg animate-pulse" />
            </div>
          </div>
        </DashboardSection>

        <DashboardSection titleKey="numeric">
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="h-64 bg-muted rounded-lg animate-pulse" />
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-card animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                <div className="h-8 bg-muted rounded w-16" />
              </div>
              <div className="border rounded-lg p-4 bg-card animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-2" />
                <div className="h-8 bg-muted rounded w-16" />
              </div>
            </div>
          </div>
        </DashboardSection>

        <DashboardSection titleKey="juz">
          <div className="h-64 bg-muted rounded-lg animate-pulse" />
        </DashboardSection>

        <DashboardSection titleKey="ruku">
          <div className="h-64 bg-muted rounded-lg animate-pulse" />
        </DashboardSection>

        <DashboardSection titleKey="pages">
          <div className="h-64 bg-muted rounded-lg animate-pulse" />
        </DashboardSection>

        <DashboardSection titleKey="verses_per_surah">
          <div className="h-64 bg-muted rounded-lg animate-pulse" />
        </DashboardSection>

        <DashboardSection titleKey="sajda">
          <Tabs defaultValue="surahs">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="surahs">all_surahs</TabsTrigger>
              <TabsTrigger value="sajda">sajda_verses</TabsTrigger>
            </TabsList>
            <TabsContent value="surahs" className="mt-4">
              <div className="h-64 bg-muted rounded-lg animate-pulse" />
            </TabsContent>
            <TabsContent value="sajda" className="mt-4">
              <div className="h-64 bg-muted rounded-lg animate-pulse" />
            </TabsContent>
          </Tabs>
        </DashboardSection>
      </div>
    );
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
          />
        </DashboardSection>
      </section>

      <DashboardSection titleKey="revelation">
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

      <DashboardSection titleKey="revelation_order">
        <RevelationOrder data={revelationOrder} />
      </DashboardSection>

      <DashboardSection titleKey="surahs">
        <div className="grid gap-4">
          <SurahCharacteristics data={surahCharacteristics} />
          <LongestShortest longest={longest} shortest={shortest} />
        </div>
      </DashboardSection>

      <DashboardSection titleKey="verses">
        <div className="grid gap-4 lg:grid-cols-2">
          <AyahStats stats={ayahLengthStats} />
          <TopSurahsByWords data={topSurahsByWords} />
        </div>
      </DashboardSection>

      <DashboardSection titleKey="word_analysis">
        <div className="grid gap-4 space-y-4">
          <LinguisticStats stats={linguisticStats} />
          <div className="grid gap-4 lg:grid-cols-2">
            <LetterFrequency data={letterFreq} />
            <WordLengthDistribution data={wordLengthDist} />
          </div>
        </div>
      </DashboardSection>

      <DashboardSection titleKey="numeric">
        <div className="grid gap-4 lg:grid-cols-2">
          <NumericPatterns patterns={numericPatterns} />
          <div className="space-y-4">
            <div className="border rounded-lg p-4 bg-card">
              <p className="text-sm text-muted-foreground">average_verses_per_page</p>
              <p className="text-3xl font-bold mt-2">{avgVersesPerPage}</p>
            </div>
            <div className="border rounded-lg p-4 bg-card">
              <p className="text-sm text-muted-foreground">unique_sanskrit_words</p>
              <p className="text-3xl font-bold mt-2">{linguisticStats.uniqueWords.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </DashboardSection>

      <DashboardSection titleKey="juz">
        <JuzChart data={juzData} />
      </DashboardSection>

      <DashboardSection titleKey="ruku">
        <RukuAnalysis data={rukuDist} />
      </DashboardSection>

      <DashboardSection titleKey="pages">
        <PageDistribution data={pageDist} />
      </DashboardSection>

      <DashboardSection titleKey="verses_per_surah">
        <VersesPerSurahChart data={versesPerSurahData} />
      </DashboardSection>

      <DashboardSection titleKey="sajda">
        <Tabs defaultValue="surahs">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="surahs">all_surahs</TabsTrigger>
            <TabsTrigger value="sajda">sajda_verses</TabsTrigger>
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
