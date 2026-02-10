"use client";

import {
  BarChart3,
  Book,
  Calendar,
  Eye,
  FileText,
  Globe,
  Hash,
  MessageCircle,
  PieChart,
  Search,
  TrendingUp,
  Users,
  Zap,
  Layout,
  Map,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
      { title: "Word Frequency", icon: Search, href: "#words" },
      { title: "Letter Frequency", icon: FileText, href: "#letters" },
      { title: "Linguistic Patterns", icon: MessageCircle, href: "#patterns" },
      { title: "Word Length Stats", icon: TrendingUp, href: "#word-length" },
    ],
  },
  {
    category: "Advanced",
    items: [
      { title: "Revelation Order", icon: Sparkles, href: "#revelation-order" },
      { title: "Ayah Statistics", icon: BarChart3, href: "#ayah-stats" },
      { title: "Themes & Topics", icon: Globe, href: "#themes" },
      { title: "Numeric Patterns", icon: Zap, href: "#numeric" },
      { title: "Surah Relationships", icon: Map, href: "#relationships" },
    ],
  },
];

function NavItem({
  title,
  icon: Icon,
  href,
}: {
  title: string;
  icon: React.FC<{ className?: string }>;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
    >
      <Icon className="w-4 h-4" />
      <span>{title}</span>
    </a>
  );
}

export function AppSidebar() {
  return (
    <aside className="w-64 border-r bg-background/50 backdrop-blur-sm sticky top-0 h-screen overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tight">Quran Analysis</h2>
        <p className="text-xs text-muted-foreground mt-1">Data & Insights</p>
      </div>

      <nav className="px-3 py-2 space-y-6">
        {navigationItems.map((section) => (
          <div key={section.category}>
            <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {section.category}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavItem key={item.href} {...item} />
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
