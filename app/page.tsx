import { fetchSurahList, fetchMeta, fetchAllJuz } from "@/lib/quran-api";
import {
  getRevelationStats,
  getRevelationChartData,
  getVersesPerSurahChartData,
  getJuzDistributionFromApi,
  getLongestSurahs,
  getShortestSurahs,
  getAyahCountStats,
  getSajdaStats,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function DashboardPage() {
  const [surahRes, metaRes, juzList] = await Promise.all([
    fetchSurahList(),
    fetchMeta(),
    fetchAllJuz(),
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container py-6">
          <h1 className="text-3xl font-bold tracking-tight">Quran Analysis Dashboard</h1>
          <p className="text-muted-foreground">
            Data from{" "}
            <a
              href="https://alquran.cloud/api"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Al-Quran Cloud API
            </a>
          </p>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        <section>
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

        <section>
          <h2 className="text-xl font-semibold mb-4">Numeric & revelation analysis</h2>
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

        <section>
          <VersesPerSurahChart data={versesPerSurahData} />
        </section>

        <section>
          <JuzChart data={juzData} />
        </section>

        <section>
          <LongestShortest longest={longest} shortest={shortest} />
        </section>

        <section>
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
      </main>
    </div>
  );
}
