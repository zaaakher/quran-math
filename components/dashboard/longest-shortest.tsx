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
import type { Surah } from "@/types/quran";

interface LongestShortestProps {
  longest: Surah[];
  shortest: Surah[];
}

export function LongestShortest({ longest, shortest }: LongestShortestProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Longest Surahs (by verses)</CardTitle>
          <CardDescription>Top 10</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Ayahs</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {longest.map((s) => (
                <TableRow key={s.number}>
                  <TableCell className="font-medium">{s.number}</TableCell>
                  <TableCell>{s.englishName}</TableCell>
                  <TableCell className="text-right">{s.numberOfAyahs}</TableCell>
                  <TableCell>
                    <Badge variant={s.revelationType === "Meccan" ? "default" : "secondary"}>
                      {s.revelationType}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Shortest Surahs (by verses)</CardTitle>
          <CardDescription>Top 10</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Ayahs</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shortest.map((s) => (
                <TableRow key={s.number}>
                  <TableCell className="font-medium">{s.number}</TableCell>
                  <TableCell>{s.englishName}</TableCell>
                  <TableCell className="text-right">{s.numberOfAyahs}</TableCell>
                  <TableCell>
                    <Badge variant={s.revelationType === "Meccan" ? "default" : "secondary"}>
                      {s.revelationType}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
