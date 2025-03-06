import { Position } from "@/api/models/positions.model";
import { Button } from "@/components/ui/button";
import { useSheet } from "@/context/sheet-trigger";
import { ColumnDef } from "@tanstack/react-table";
import { ChartCandlestick } from "lucide-react";



export const columns: ColumnDef<Position>[] = [
  {
    accessorKey: "Account",
    header: "Account",
  },
  {
    accessorKey: "Security",
    header: "Security",
  },
  {
    accessorKey: "Quantity",
    header: "Quantity",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { setOpen } = useSheet();

      const tradeData  = row.original;

      return (
          <Button onClick={() => setOpen(true, tradeData)} variant="outline">
            View <ChartCandlestick className="h-4 w-4" />
          </Button>
      );
    },
    header: "Full Log",
  },
];
