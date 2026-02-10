"use client";

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
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    category: "Main",
    items: [
      { title: "Overview", icon: Layout, href: "#overview" },
      { title: "Surahs", icon: Book, href: "#surahs" },
    ],
  },
  {
    category: "Analysis",
    items: [
      { title: "Revelation", icon: Calendar, href: "#revelation" },
      { title: "Verses", icon: FileText, href: "#verses" },
      { title: "Juz Distribution", icon: Hash, href: "#juz" },
      { title: "Sajda Verses", icon: Eye, href: "#sajda" },
      { title: "Ruku Analysis", icon: PieChart, href: "#ruku" },
      { title: "Page Distribution", icon: BarChart3, href: "#pages" },
    ],
  },
  {
    category: "Linguistic",
    items: [
      { title: "Word & Letter Analysis", icon: Search, href: "#word-analysis" },
      { title: "Linguistic Stats", icon: MessageCircle, href: "#word-analysis" },
    ],
  },
  {
    category: "Advanced",
    items: [
      { title: "Revelation Order", icon: Sparkles, href: "#revelation-order" },
      { title: "Numeric Patterns", icon: Zap, href: "#numeric" },
      { title: "Verses Per Surah", icon: BarChart3, href: "#verses-per-surah" },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
          <Book className="h-6 w-6" />
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold">Quran Analysis</p>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navigationItems.map((section) => (
          <SidebarGroup key={section.category}>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
              {section.category}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                      >
                        <a href={item.href} className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
