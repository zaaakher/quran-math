"use client"

import { Github, SidebarIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { LanguageSwitcher } from "@/components/language-switcher"
import Link from "next/link"
import { SikkaDropdown } from "./sikka-dropdown"

export function SiteHeader() {
    const { toggleSidebar } = useSidebar()
    const t = useTranslations("layout")

    return (
        <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
            <div className="flex h-(--header-height) w-full items-center justify-between gap-2 px-2">
                <div className="flex flex-row gap-4 items-center">
                    <Button
                        className="h-8 w-8"
                        variant="outline"
                        size="icon"
                        onClick={toggleSidebar}
                    >
                        <SidebarIcon />
                    </Button>
                    <div className="flex flex-col">
                        <h1 className="font-semibold">{t("title")}</h1>
                        <p className="text-xs text-muted-foreground">{t("subtitle")}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <SikkaDropdown />
                    <LanguageSwitcher />
                    <Link href="https://github.com/zaaakher/quran-math" target="_blank" rel="noopener noreferrer">
                        <Button
                            className="h-8 w-8"
                            variant="outline"
                            size="icon"
                        >
                            <Github />
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}
