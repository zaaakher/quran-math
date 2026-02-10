// API response types from https://api.alquran.cloud

export type RevelationType = "Meccan" | "Medinan";

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
  revelationType: RevelationType;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz?: number;
  manzil?: number;
  page?: number;
  ruku?: number;
  hizbQuarter?: number;
  sajda?: boolean;
}

export interface SurahWithAyahs extends Surah {
  ayahs: Ayah[];
}

export interface SajdaReference {
  surah: number;
  ayah: number;
  recommended: boolean;
  obligatory: boolean;
}

export interface RukuReference {
  surah: number;
  ayah: number;
}

export interface MetaData {
  ayahs: { count: number };
  surahs: { count: number; references: Surah[] };
  sajdas: { count: number; references: SajdaReference[] };
  rukus: { count: number; references: RukuReference[] };
}

export interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

/** Juz response from GET /juz/{{juz}}/{{edition}} */
export interface JuzData {
  number: number;
  ayahs: AyahInJuz[];
}

export interface AyahInJuz extends Ayah {
  surah?: Surah;
}
