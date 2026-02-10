import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchFullQuran } from "@/lib/quran-api";
import { countWordsAndLetters } from "@/lib/analysis";
import { useTranslations } from "next-intl";

export function WordStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Word & Letter Count</CardTitle>
        <CardDescription>Approximate from Arabic text</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </CardContent>
    </Card>
  );
}
