"use client";

import { useLocaleContext } from "@/lib/locale-context";
import { DashboardPageContent } from "./dashboard-page-content";

import { useQuranStore } from "@/lib/store"
import { fetchAndStoreQuranData } from "@/lib/quran-api"
import { useEffect } from "react"


export function DashboardWrapper() {
    const { locale } = useLocaleContext();

    const { isLoading, setIsLoading, surahs } = useQuranStore()

    useEffect(() => {
        // Only fetch data if we don't already have it
        setIsLoading(true)
        if (surahs.length === 0) {
            fetchAndStoreQuranData()
                .then(() => setIsLoading(false))
                .catch((error) => {
                    console.error("Error fetching Quran data:", error);
                    setIsLoading(false);
                });
        }
    }, [surahs.length])



    return <DashboardPageContent locale={locale} />


}