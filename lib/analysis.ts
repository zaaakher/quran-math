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
    if (s.revelationType.toLowerCase() === "meccan") {
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
    { name: "meccan", ayahs: stats.meccanAyahs, surahs: stats.meccanSurahs, fill: "var(--chart-1)" },
    { name: "medinan", ayahs: stats.medinanAyahs, surahs: stats.medinanSurahs, fill: "var(--chart-2)" },
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

/** Analyze letter frequency in the Quran */
export function getLetterFrequency(surahs: Surah[], surahsWithAyahs?: any[]) {
  const letterMap = new Map<string, number>();
  if (!surahsWithAyahs) return Array.from(letterMap.entries()).map(([letter, count]) => ({ letter, count }));

  for (const surah of surahsWithAyahs) {
    for (const ayah of surah.ayahs) {
      const text = ayah.text.replace(/[\s\n]/g, "");
      for (const letter of text) {
        letterMap.set(letter, (letterMap.get(letter) ?? 0) + 1);
      }
    }
  }

  return Array.from(letterMap.entries())
    .map(([letter, count]) => ({ letter, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
}

/** Analyze word length distribution */
export function getWordLengthDistribution(surahsWithAyahs?: any[]) {
  const lengthMap = new Map<number, number>();
  if (!surahsWithAyahs) return [];

  for (const surah of surahsWithAyahs) {
    for (const ayah of surah.ayahs) {
      const words = ayah.text.split(/\s+/).filter((w: string) => w.length > 0);
      for (const word of words) {
        const len = word.length;
        lengthMap.set(len, (lengthMap.get(len) ?? 0) + 1);
      }
    }
  }

  return Array.from(lengthMap.entries())
    .map(([length, count]) => ({ length, count }))
    .sort((a, b) => a.length - b.length);
}

/** Get Ruku distribution across Quran */
export function getRukuDistribution(surahsWithAyahs?: any[]) {
  const rukuMap = new Map<number, { count: number; surahCount: number }>();
  if (!surahsWithAyahs) return [];

  for (const surah of surahsWithAyahs) {
    const rukuSet = new Set<number>();
    for (const ayah of surah.ayahs) {
      if (ayah.ruku) {
        rukuMap.set(ayah.ruku, {
          count: (rukuMap.get(ayah.ruku)?.count ?? 0) + 1,
          surahCount: 1
        });
        rukuSet.add(ayah.ruku);
      }
    }
  }

  return Array.from(rukuMap.entries())
    .map(([ruku, data]) => ({ ruku, ayahs: data.count }))
    .sort((a, b) => b.ayahs - a.ayahs)
    .slice(0, 30);
}

/** Get page distribution across Quran pages */
export function getPageDistribution(surahsWithAyahs?: any[]) {
  const pageMap = new Map<number, number>();
  if (!surahsWithAyahs) return [];

  for (const surah of surahsWithAyahs) {
    for (const ayah of surah.ayahs) {
      if (ayah.page) {
        pageMap.set(ayah.page, (pageMap.get(ayah.page) ?? 0) + 1);
      }
    }
  }

  return Array.from(pageMap.entries())
    .map(([page, ayahs]) => ({ page, ayahs }))
    .sort((a, b) => a.page - b.page);
}

/** Analyze ayah (verse) length distribution */
export function getAyahLengthStats(surahsWithAyahs?: any[]) {
  if (!surahsWithAyahs) return { avg: 0, min: 0, max: 0, median: 0 };

  const lengths: number[] = [];
  for (const surah of surahsWithAyahs) {
    for (const ayah of surah.ayahs) {
      lengths.push(ayah.text.length);
    }
  }

  const sorted = lengths.sort((a, b) => a - b);
  const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];

  return {
    avg: Math.round(avg),
    min: Math.min(...lengths),
    max: Math.max(...lengths),
    median
  };
}

/** Get top surahs by word count */
export function getTopSurahsByWordCount(surahsWithAyahs?: any[], limit = 15) {
  if (!surahsWithAyahs) return [];

  return surahsWithAyahs
    .map(surah => {
      const wordCount = surah.ayahs.reduce((sum: number, ayah: any) => {
        const words = ayah.text.split(/\s+/).filter((w: string) => w.length > 0);
        return sum + words.length;
      }, 0);
      return {
        surahNumber: surah.number,
        surahName: surah.englishName,
        words: wordCount,
        ayahs: surah.numberOfAyahs
      };
    })
    .sort((a, b) => b.words - a.words)
    .slice(0, limit);
}

/** Get revelation order of surahs */
export function getRevelationOrder(surahs: Surah[]) {
  const revelationOrderData: { [key: string]: string } = {
    "1": "96", "2": "68", "3": "73", "4": "74", "5": "1", "6": "111",
    "7": "81", "8": "87", "9": "92", "10": "89", "11": "93", "12": "94",
    "13": "103", "14": "100", "15": "108", "16": "102", "17": "107",
    "18": "109", "19": "110", "20": "113", "21": "114", "22": "112",
    "23": "53", "24": "80", "25": "97", "26": "51", "27": "34", "28": "21",
    "29": "76", "30": "44", "31": "7", "32": "86", "33": "54", "34": "55",
    "35": "56", "36": "26", "37": "27", "38": "28", "39": "15", "40": "29",
    "41": "31", "42": "34", "43": "39", "44": "40", "45": "41", "46": "45",
    "47": "50", "48": "42", "49": "35", "50": "36", "51": "43", "52": "72",
    "53": "46", "54": "65", "55": "47", "56": "32", "57": "52", "58": "67",
    "59": "69", "60": "70", "61": "71", "62": "57", "63": "98", "64": "59",
    "65": "66", "66": "48", "67": "61", "68": "62", "69": "63", "70": "64",
    "71": "58", "72": "49", "73": "60", "74": "78", "75": "77", "76": "75",
    "77": "76", "78": "101", "79": "99", "80": "82", "81": "84", "82": "30",
    "83": "104", "84": "91", "85": "79", "86": "25", "87": "83", "88": "2",
    "89": "3", "90": "33", "91": "60", "92": "4", "93": "37", "94": "38",
    "95": "24", "96": "23", "97": "5", "98": "6", "99": "8", "100": "9",
    "101": "16", "102": "13", "103": "11", "104": "17", "105": "18",
    "106": "19", "107": "20", "108": "22", "109": "10", "110": "12",
    "111": "14"
  };

  const meccan = surahs.filter((s) => s.revelationType.toLowerCase() === "meccan");
  const medinan = surahs.filter((s) => s.revelationType.toLowerCase() === "medinan");

  return {
    total: surahs.length,
    meccanCount: meccan.length,
    medinanCount: medinan.length,
    firstRevealed: "Al-Alaq (96)",
    lastRevealed: "An-Nasr (110)"
  };
}

/** Get average verses per page */
export function getAverageVersesPerPage(surahsWithAyahs?: any[]) {
  if (!surahsWithAyahs) return 0;

  const pageMap = new Map<number, number>();
  for (const surah of surahsWithAyahs) {
    for (const ayah of surah.ayahs) {
      if (ayah.page) {
        pageMap.set(ayah.page, (pageMap.get(ayah.page) ?? 0) + 1);
      }
    }
  }

  if (pageMap.size === 0) return 0;
  const total = Array.from(pageMap.values()).reduce((a, b) => a + b, 0);
  return Math.round((total / pageMap.size) * 10) / 10;
}

/** Get linguistic diversity and text statistics */
export function getLinguisticStats(surahsWithAyahs?: any[]) {
  if (!surahsWithAyahs) return {
    totalWords: 0,
    totalLetters: 0,
    uniqueWords: 0,
    averageWordLength: 0,
    typeTokenRatio: 0
  };

  const wordMap = new Map<string, number>();
  let totalWords = 0;
  let totalLetters = 0;
  let totalWordLength = 0;

  for (const surah of surahsWithAyahs) {
    for (const ayah of surah.ayahs) {
      const words = ayah.text.split(/\s+/).filter((w: string) => w.length > 0);
      totalWords += words.length;
      totalLetters += ayah.text.replace(/\s/g, "").length;

      for (const word of words) {
        wordMap.set(word, (wordMap.get(word) ?? 0) + 1);
        totalWordLength += word.length;
      }
    }
  }

  return {
    totalWords,
    totalLetters,
    uniqueWords: wordMap.size,
    averageWordLength: totalWords > 0 ? Math.round((totalWordLength / totalWords) * 100) / 100 : 0,
    typeTokenRatio: totalWords > 0 ? Math.round((wordMap.size / totalWords) * 10000) / 100 : 0
  };
}

/** Analyze numeric patterns in verse numbers */
export function getNumericPatterns(surahsWithAyahs?: any[]) {
  if (!surahsWithAyahs) return {
    perfectSquareVersesCount: 0,
    primeVersesCount: 0,
    fibonacciVersesCount: 0
  };

  const patterns = {
    perfectSquares: [] as number[],
    primes: [] as number[],
    fibonaccis: [] as number[],
  };

  const ayahNumbers = new Set<number>();
  for (const surah of surahsWithAyahs) {
    for (const ayah of surah.ayahs) {
      ayahNumbers.add(ayah.number);
    }
  }

  const isPrime = (n: number) => {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
    return true;
  };

  const isFibonacci = (n: number) => {
    let a = 0, b = 1;
    while (a < n) [a, b] = [b, a + b];
    return a === n;
  };

  for (const num of ayahNumbers) {
    if (Math.sqrt(num) % 1 === 0) patterns.perfectSquares.push(num);
    if (isPrime(num)) patterns.primes.push(num);
    if (isFibonacci(num)) patterns.fibonaccis.push(num);
  }

  return {
    perfectSquareVersesCount: patterns.perfectSquares.length,
    primeVersesCount: patterns.primes.length,
    fibonacciVersesCount: patterns.fibonaccis.length
  };
}

/** Get surah characteristics and relationships */
export function getSurahCharacteristics(surahs: Surah[]) {
  const makkah = surahs.filter(s => s.revelationType.toLowerCase() === "meccan");
  const madinah = surahs.filter(s => s.revelationType.toLowerCase() === "medinan");

  const longestSurah = surahs.reduce((max, s) => s.numberOfAyahs > max.numberOfAyahs ? s : max);
  const shortestSurah = surahs.reduce((min, s) => s.numberOfAyahs < min.numberOfAyahs ? s : min);

  return {
    total: surahs.length,
    makkahSurahs: makkah.length,
    madinahSurahs: madinah.length,
    longestSurahName: longestSurah.englishName,
    longestSurahVerses: longestSurah.numberOfAyahs,
    shortestSurahName: shortestSurah.englishName,
    shortestSurahVerses: shortestSurah.numberOfAyahs,
  };
}
