"use client";

import { useLocaleContext } from "@/lib/locale-context";
import { DashboardPageContent } from "./dashboard-page-content";

import { InitialLoading } from "@/components/initial-loading"
import { useQuranStore } from "@/lib/store"
import { fetchAndStoreQuranData } from "@/lib/quran-api"
import { useEffect } from "react"
import { LoadingScreen } from "./loading-screen";


export function DashboardWrapper() {
    const { locale } = useLocaleContext();

    const { isLoading, surahs } = useQuranStore()

    useEffect(() => {
        // Only fetch data if we don't already have it
        if (surahs.length === 0) {
            fetchAndStoreQuranData()
        }
    }, [surahs.length])

    if (isLoading) {
        return <LoadingScreen />
    }


    return <DashboardPageContent locale={locale} />;
}