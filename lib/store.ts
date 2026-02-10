import { create } from 'zustand'
import { Surah, Ayah, JuzData, AyahInJuz } from '@/types/quran'

interface QuranStore {
  // Data
  surahs: Surah[]
  ayahs: Ayah[]
  juzs: JuzData[]

  // Loading state
  isLoading: boolean
  progress: number
  error: string | null

  // Actions
  setIsLoading: (loading: boolean) => void
  setProgress: (progress: number) => void
  setData: (surahs: Surah[], ayahs: Ayah[], juzs: JuzData[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearData: () => void
}

export const useQuranStore = create<QuranStore>((set) => ({
  // Initial state
  surahs: [],
  ayahs: [],
  juzs: [],
  isLoading: false,
  progress: 0,
  error: null,

  // Actions
  setIsLoading: (loading: boolean) => set((state) => ({
    ...state,
    isLoading: loading
  })),
  setProgress: (progress: number) => set((state) => ({
    ...state,
    progress
  })),
  setData: (surahs: Surah[], ayahs: Ayah[], juzs: JuzData[]) => set((state) => ({
    ...state,
    surahs,
    ayahs,
    juzs,
    progress: 100,
    error: null
  })),

  setLoading: (loading: boolean) => set((state) => ({
    ...state,
    isLoading: loading
  })),

  setError: (error: string | null) => set((state) => ({
    ...state,
    error,
    isLoading: false,
    progress: 0
  })),

  clearData: () => set((state) => ({
    ...state,
    surahs: [],
    ayahs: [],
    juzs: [],
    isLoading: false,
    progress: 0,
    error: null
  }))
}))
