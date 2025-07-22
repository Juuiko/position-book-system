import { Position } from "@/api/models/positions.model";
import { ColumnDef } from "@tanstack/react-table";
import { FullLogButton } from "./full-log-button";



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
    cell: ({ row }) => <FullLogButton tradeData={row.original} />,
    header: "Full Log",
  },
];
