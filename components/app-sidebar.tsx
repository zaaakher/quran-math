"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
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
  Send,
  LifeBuoy,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("sidebar")

  const data = {
    navMain: [
      {
        title: t("main"),
        items: [
          {
            title: t("overview"),
            url: "#overview",
            icon: Layout,
          },
          {
            title: t("surahs"),
            url: "#surahs",
            icon: Book,
          },
        ],
      },
      {
        title: t("analysis"),
        items: [
          {
            title: t("revelation"),
            url: "#revelation",
            icon: Calendar,
          },
          {
            title: t("verses"),
            url: "#verses",
            icon: FileText,
          },
          {
            title: t("juz_distribution"),
            url: "#juz",
            icon: Hash,
          },
          {
            title: t("sajda_verses"),
            url: "#sajda",
            icon: Eye,
          },
          {
            title: t("ruku_analysis"),
            url: "#ruku",
            icon: PieChart,
          },
          {
            title: t("page_distribution"),
            url: "#pages",
            icon: BarChart3,
          },
        ],
      },
      {
        title: t("linguistic"),
        items: [
          {
            title: t("word_letter"),
            url: "#word-analysis",
            icon: Search,
          },
        ],
      },
      {
        title: t("advanced"),
        items: [
          {
            title: t("revelation_order"),
            url: "#revelation-order",
            icon: Sparkles,
          },
          {
            title: t("numeric_patterns"),
            url: "#numeric",
            icon: Zap,
          },
          {
            title: t("verses_per_surah"),
            url: "#verses-per-surah",
            icon: BarChart3,
          },
        ],
      },
    ],
    navSecondary: [
      // {
      //   title: "Support",
      //   url: "#",
      //   icon: LifeBuoy,
      // },
      {
        title: t('feedback'),
        url: "https://github.com/zaaakher/quran-math/issues/new",
        icon: Send,
      },
    ],
  }



  return (
    <Sidebar
      collapsible="icon"
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarContent>
        <NavMain items={data.navMain} />

      </SidebarContent>
      <SidebarRail />

      <SidebarGroup>
        <SidebarMenu>
          {data.navSecondary.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

    </Sidebar>
  )
}
