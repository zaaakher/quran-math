"use client"

import * as React from "react"
import {
  BarChart3,
  Book,
  Calendar,
  Eye,
  FileText,
  Hash,
  PieChart,
  Search,
  Zap,
  Layout,
  Sparkles,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Main",
      items: [
        {
          title: "Overview",
          url: "#overview",
          icon: Layout,
        },
        {
          title: "Surahs",
          url: "#surahs",
          icon: Book,
        },
      ],
    },
    {
      title: "Analysis",
      items: [
        {
          title: "Revelation",
          url: "#revelation",
          icon: Calendar,
        },
        {
          title: "Verses",
          url: "#verses",
          icon: FileText,
        },
        {
          title: "Juz Distribution",
          url: "#juz",
          icon: Hash,
        },
        {
          title: "Sajda Verses",
          url: "#sajda",
          icon: Eye,
        },
        {
          title: "Ruku Analysis",
          url: "#ruku",
          icon: PieChart,
        },
        {
          title: "Page Distribution",
          url: "#pages",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Linguistic",
      items: [
        {
          title: "Word & Letter",
          url: "#word-analysis",
          icon: Search,
        },
      ],
    },
    {
      title: "Advanced",
      items: [
        {
          title: "Revelation Order",
          url: "#revelation-order",
          icon: Sparkles,
        },
        {
          title: "Numeric Patterns",
          url: "#numeric",
          icon: Zap,
        },
        {
          title: "Verses Per Surah",
          url: "#verses-per-surah",
          icon: BarChart3,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >

      {/*  <Sidebar collapsible="icon" {...props}> */}
      {/* <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Book className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Quran</span>
            <span className="truncate text-xs">Analysis</span>
          </div>
        </div>
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
