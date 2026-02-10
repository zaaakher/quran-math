import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { SajdaReference } from "@/types/quran";

interface SajdaTableProps {
  sajdas: SajdaReference[];
  surahNames: Map<number, string>;
}

export function SajdaTable({ sajdas, surahNames }: SajdaTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sajda (Prostration) Verses</CardTitle>
        <CardDescription>
          {sajdas.length} verses where prostration is recommended or obligatory
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Surah</TableHead>
              <TableHead>Ayah</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sajdas.map((s, i) => (
              <TableRow key={`${s.surah}-${s.ayah}`}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{surahNames.get(s.surah) ?? `Surah ${s.surah}`}</TableCell>
                <TableCell>{s.ayah}</TableCell>
                <TableCell className="font-mono">
                  {s.surah}:{s.ayah}
                </TableCell>
                <TableCell>
                  {s.obligatory ? (
                    <Badge variant="destructive">Obligatory</Badge>
                  ) : (
                    <Badge variant="secondary">Recommended</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
