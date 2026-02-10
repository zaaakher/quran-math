"use client"

import { Github, SidebarIcon } from "lucide-react"

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
import Link from "next/link"

export function SiteHeader() {
    const { toggleSidebar } = useSidebar()

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
                    {/* <Separator orientation="vertical" className="mr- h-4" /> */}
                    <div className="flex flex-col">
                        <h1 className="font-semibold">Quran Analysis Dashboard</h1>
                        <p className="text-xs text-muted-foreground">Data from https://api.alquran.cloud/v1</p>
                    </div>
                </div>
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
        </header>
    )
}
