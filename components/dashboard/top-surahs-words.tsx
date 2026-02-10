import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TopSurahsByWordsProps {
  data: Array<{
    surahNumber: number;
    surahName: string;
    words: number;
    ayahs: number;
  }>;
}

export function TopSurahsByWords({ data }: TopSurahsByWordsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Surahs by Word Count</CardTitle>
        <CardDescription>Surahs with the most words in the Quran</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Surah</TableHead>
                <TableHead className="text-right">Words</TableHead>
                <TableHead className="text-right">Verses</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((surah) => (
                <TableRow key={surah.surahNumber}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{surah.surahName}</p>
                      <Badge variant="outline" className="text-xs mt-1">#{surah.surahNumber}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{surah.words.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{surah.ayahs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
