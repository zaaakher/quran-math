import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NumericPatternsProps {
  patterns: {
    perfectSquareVersesCount: number;
    primeVersesCount: number;
    fibonacciVersesCount: number;
  };
}

export function NumericPatterns({ patterns }: NumericPatternsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Numeric Patterns</CardTitle>
        <CardDescription>Mathematical patterns found in verse numbers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Perfect Squares</p>
              <p className="text-xs text-muted-foreground">e.g., 1, 4, 9, 16, 25...</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{patterns.perfectSquareVersesCount}</p>
              <Badge variant="outline" className="mt-2">Verses</Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Prime Numbers</p>
              <p className="text-xs text-muted-foreground">e.g., 2, 3, 5, 7, 11...</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{patterns.primeVersesCount}</p>
              <Badge variant="outline" className="mt-2">Verses</Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Fibonacci Numbers</p>
              <p className="text-xs text-muted-foreground">e.g., 1, 1, 2, 3, 5, 8...</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{patterns.fibonacciVersesCount}</p>
              <Badge variant="outline" className="mt-2">Verses</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
