"use client"

import {
  BarChart3,
  Book,
  Calendar,
  Eye,
  FileText,
  Hash,
  MessageCircle,
  PieChart,
  Search,
  Zap,
  Layout,
  Sparkles,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navigationData = [
  {
    category: "Main",
    items: [
      { title: "Overview", icon: Layout, url: "#overview" },
      { title: "Surahs", icon: Book, url: "#surahs" },
    ],
  },
  {
    category: "Analysis",
    items: [
      { title: "Revelation", icon: Calendar, url: "#revelation" },
      { title: "Verses", icon: FileText, url: "#verses" },
      { title: "Juz Distribution", icon: Hash, url: "#juz" },
      { title: "Sajda Verses", icon: Eye, url: "#sajda" },
      { title: "Ruku Analysis", icon: PieChart, url: "#ruku" },
      { title: "Page Distribution", icon: BarChart3, url: "#pages" },
    ],
  },
  {
    category: "Linguistic",
    items: [
      { title: "Word & Letter", icon: Search, url: "#word-analysis" },
    ],
  },
  {
    category: "Advanced",
    items: [
      { title: "Revelation Order", icon: Sparkles, url: "#revelation-order" },
      { title: "Numeric Patterns", icon: Zap, url: "#numeric" },
      { title: "Verses Per Surah", icon: BarChart3, url: "#verses-per-surah" },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <Book className="h-6 w-6" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Quran</span>
            <span className="text-xs text-muted-foreground">Analysis</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navigationData.map((section) => (
          <SidebarGroup key={section.category}>
            <SidebarGroupLabel>{section.category}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                      >
                        <a href={item.url} className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
