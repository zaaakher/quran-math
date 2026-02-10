const BASE = "https://api.alquran.cloud/v1";

async function fetchJuzOnce(
  juzNumber: number,
  edition: string
): Promise<import("@/types/quran").ApiResponse<import("@/types/quran").JuzData> | null> {
  try {
    const res = await fetch(`${BASE}/juz/${juzNumber}/${edition}`, {
      next: { revalidate: 86400 },
      headers: { "Accept-Encoding": "gzip" },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchJuz(
  juzNumber: number,
  edition = "quran-uthmani"
): Promise<import("@/types/quran").ApiResponse<import("@/types/quran").JuzData> | null> {
  const res = await fetchJuzOnce(juzNumber, edition);
  if (res?.code === 200 && res.data) return res;
  await new Promise((r) => setTimeout(r, 500));
  return fetchJuzOnce(juzNumber, edition);
}

/** Delay helper to avoid rate limiting */
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Fetches all 30 juz from the API sequentially to avoid rate limiting. */
export async function fetchAllJuz(
  edition = "quran-uthmani"
): Promise<import("@/types/quran").JuzData[]> {
  const results: import("@/types/quran").JuzData[] = [];
  for (let i = 1; i <= 30; i++) {
    const res = await fetchJuz(i, edition);
    if (res?.code === 200 && res.data) {
      results.push(res.data);
    }
    if (i < 30) await delay(200);
  }
  return results.sort((a, b) => a.number - b.number);
}

export async function fetchSurahList(): Promise<
  import("@/types/quran").ApiResponse<import("@/types/quran").Surah[]>
> {
  const res = await fetch(`${BASE}/surah`, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error("Failed to fetch surah list");
  return res.json();
}

export async function fetchMeta(): Promise<
  import("@/types/quran").ApiResponse<import("@/types/quran").MetaData>
> {
  const res = await fetch(`${BASE}/meta`, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error("Failed to fetch meta");
  return res.json();
}

export async function fetchSurah(
  surahNumber: number,
  edition = "quran-uthmani"
): Promise<
  import("@/types/quran").ApiResponse<import("@/types/quran").SurahWithAyahs>
> {
  const res = await fetch(`${BASE}/surah/${surahNumber}/${edition}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`Failed to fetch surah ${surahNumber}`);
  return res.json();
}

export async function fetchFullQuran(
  edition = "quran-uthmani"
): Promise<
  import("@/types/quran").ApiResponse<{ surahs: import("@/types/quran").SurahWithAyahs[] }>
> {
  const res = await fetch(`${BASE}/quran/${edition}`, {
    // Don't cache large responses to avoid memory issues
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch full Quran");
  return res.json();
}

export async function fetchSajda(
  edition = "quran-uthmani"
): Promise<
  import("@/types/quran").ApiResponse<{
    ayahs: Array<{
      number: number;
      text: string;
      numberInSurah: number;
      juz: number;
      manzil: number;
      page: number;
      ruku: number;
      hizbQuarter: number;
      sajda: boolean;
      surah: import("@/types/quran").Surah;
    }>;
  }>
> {
  const res = await fetch(`${BASE}/sajda/${edition}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Failed to fetch sajda");
  return res.json();
}
