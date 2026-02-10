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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function DashboardPage() {
  const [surahRes, metaRes, juzList, fullQuranRes] = await Promise.all([
    fetchSurahList(),
    fetchMeta(),
    fetchAllJuz(),
    fetchFullQuran(),
  ]);

  if (surahRes.code !== 200 || !surahRes.data) {
    return (
      <div className="container py-12 text-center">
        <p className="text-destructive">Failed to load Quran data.</p>
      </div>
    );
  }

  const surahs = surahRes.data;
  const meta = metaRes.code === 200 && metaRes.data ? metaRes.data : null;
  const surahsWithAyahs = fullQuranRes?.code === 200 ? fullQuranRes.data?.surahs : [];

  const revelationStats = getRevelationStats(surahs);
  const revelationChartData = getRevelationChartData(surahs);
  const versesPerSurahData = getVersesPerSurahChartData(surahs);
  const juzData = getJuzDistributionFromApi(juzList);
  const longest = getLongestSurahs(surahs, 10);
  const shortest = getShortestSurahs(surahs, 10);
  const ayahStats = getAyahCountStats(surahs);

  const sajdas = meta?.sajdas?.references ?? [];
  const sajdaStats = getSajdaStats(sajdas);
  const surahNames = new Map(surahs.map((s) => [s.number, s.englishName]));

  // New advanced analysis
  const letterFreq = getLetterFrequency(surahs, surahsWithAyahs);
  const wordLengthDist = getWordLengthDistribution(surahsWithAyahs);
  const rukuDist = getRukuDistribution(surahsWithAyahs);
  const pageDist = getPageDistribution(surahsWithAyahs);
  const ayahLengthStats = getAyahLengthStats(surahsWithAyahs);
  const topSurahsByWords = getTopSurahsByWordCount(surahsWithAyahs, 15);
  const revelationOrder = getRevelationOrder(surahs);
  const avgVersesPerPage = getAverageVersesPerPage(surahsWithAyahs);
  const linguisticStats = getLinguisticStats(surahsWithAyahs);
  const numericPatterns = getNumericPatterns(surahsWithAyahs);
  const surahCharacteristics = getSurahCharacteristics(surahs);

  return (
    <div className="container py-8 space-y-8">
      <section id="overview">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
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
        </section>

        <Separator />

        <section id="revelation">
          <h2 className="text-xl font-semibold mb-4">Revelation & Structure Analysis</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <RevelationChart data={revelationChartData} />
            <div className="space-y-4">
              <StatsCards
                ayahStats={ayahStats}
                sajdaTotal={sajdaStats.total}
                sajdaObligatory={sajdaStats.obligatory}
                sajdaRecommended={sajdaStats.recommended}
              />
              <Suspense fallback={<Skeleton className="h-[140px] w-full rounded-lg" />}>
                <WordStats />
              </Suspense>
            </div>
          </div>
        </section>

        <section id="revelation-order">
          <RevelationOrder data={revelationOrder} />
        </section>

        <Separator />

        <section id="surahs">
          <h2 className="text-xl font-semibold mb-4">Surah Analysis</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <SurahCharacteristics data={surahCharacteristics} />
            <LongestShortest longest={longest} shortest={shortest} />
          </div>
        </section>

        <section id="verses">
          <h2 className="text-xl font-semibold mb-4">Verse (Ayah) Analysis</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <AyahStats stats={ayahLengthStats} />
            <TopSurahsByWords data={topSurahsByWords} />
          </div>
        </section>

        <Separator />

        <section id="word-analysis">
          <h2 className="text-xl font-semibold mb-4">Linguistic Analysis</h2>
          <div className="grid gap-4 space-y-4">
            <LinguisticStats stats={linguisticStats} />
            <div className="grid gap-4 lg:grid-cols-2">
              <LetterFrequency data={letterFreq} />
              <WordLengthDistribution data={wordLengthDist} />
            </div>
          </div>
        </section>

        <Separator />

        <section id="numeric">
          <h2 className="text-xl font-semibold mb-4">Numeric Patterns & Advanced Analytics</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <NumericPatterns patterns={numericPatterns} />
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-card">
                <p className="text-sm text-muted-foreground">Average Verses Per Page</p>
                <p className="text-3xl font-bold mt-2">{avgVersesPerPage}</p>
              </div>
              <div className="border rounded-lg p-4 bg-card">
                <p className="text-sm text-muted-foreground">Unique Sanskrit Words</p>
                <p className="text-3xl font-bold mt-2">{linguisticStats.uniqueWords.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="juz">
          <JuzChart data={juzData} />
        </section>

        <section id="ruku">
          <RukuAnalysis data={rukuDist} />
        </section>

        <section id="pages">
          <PageDistribution data={pageDist} />
        </section>

        <section id="verses-per-surah">
          <VersesPerSurahChart data={versesPerSurahData} />
        </section>

        <section id="sajda">
          <Tabs defaultValue="surahs">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="surahs">All Surahs</TabsTrigger>
              <TabsTrigger value="sajda">Sajda Verses</TabsTrigger>
            </TabsList>
            <TabsContent value="surahs" className="mt-4">
              <SurahsTable surahs={surahs} />
            </TabsContent>
            <TabsContent value="sajda" className="mt-4">
              <SajdaTable sajdas={sajdas} surahNames={surahNames} />
            </TabsContent>
          </Tabs>
        </section>
    </div>
  );
}
