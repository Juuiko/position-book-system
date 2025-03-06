import { getPositions } from "@/api/get-positions";
import { TradesSheet } from "@/components/trades-sheet/trades-sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SheetProvider } from "@/context/sheet-trigger";
import { columns } from "@/features/positions-table/columns";
import { PSTable } from "@/features/positions-table/positions-table";
import { useEffect, useState } from "react";
import { Position } from "@/api/models/positions.model";

export default function PositionSummary() {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    getPositions().then((positions: Position[]) => {
      setPositions(positions);
    });
  }, []);

  return (
    <div>
      <SheetProvider>
        <Card className="m-8">
          <CardHeader>
            <CardTitle>
              <h1>Summary of Positions</h1>
            </CardTitle>
            <CardDescription>
              Aggregrated BOUGHT/SOLD/CANCELLED Securities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PSTable columns={columns} data={positions} />
          </CardContent>
        </Card>
        <TradesSheet />
      </SheetProvider>
    </div>
  );
}
