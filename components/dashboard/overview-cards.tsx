import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Layers, Moon, Sun, CircleDot, BookMarked, FileText } from "lucide-react";

interface OverviewCardsProps {
  totalAyahs: number;
  totalSurahs: number;
  totalPages: number;
  totalRukus: number;
  totalSajdas: number;
  meccanAyahs: number;
  medinanAyahs: number;
  meccanSurahs: number;
  medinanSurahs: number;
}

export function OverviewCards({
  totalAyahs,
  totalSurahs,
  totalPages,
  totalRukus,
  totalSajdas,
  meccanAyahs,
  medinanAyahs,
  meccanSurahs,
  medinanSurahs,
}: OverviewCardsProps) {
  const cards = [
    {
      title: "Total Verses (Āyāt)",
      value: totalAyahs.toLocaleString(),
      desc: "Ayahs in the entire Quran",
      icon: BookOpen,
    },
    {
      title: "Surahs",
      value: totalSurahs.toString(),
      desc: "Chapters",
      icon: Layers,
    },
    {
      title: "Pages",
      value: totalPages.toString(),
      desc: "Traditional printed pages (Mushaf)",
      icon: FileText,
    },
    {
      title: "Rukus",
      value: totalRukus.toString(),
      desc: "Section divisions",
      icon: BookMarked,
    },
    {
      title: "Sajda Verses",
      value: totalSajdas.toString(),
      desc: "Prostration verses",
      icon: CircleDot,
    },
    {
      title: "Meccan",
      value: `${meccanSurahs} surahs · ${meccanAyahs.toLocaleString()} ayahs`,
      desc: "Revealed in Makkah",
      icon: Sun,
    },
    {
      title: "Medinan",
      value: `${medinanSurahs} surahs · ${medinanAyahs.toLocaleString()} ayahs`,
      desc: "Revealed in Madinah",
      icon: Moon,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.desc}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
