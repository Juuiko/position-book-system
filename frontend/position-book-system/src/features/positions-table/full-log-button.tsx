import { Button } from "@/components/ui/button";
import { Position } from "@/api/models/positions.model";
import { useSheet } from "@/context/sheet-trigger/use-sheet";
import { ChartCandlestick } from "lucide-react";

interface FullLogButtonProps {
  tradeData: Position;
}

export const FullLogButton: React.FC<FullLogButtonProps> = ({ tradeData }) => {
  const { setOpen } = useSheet();

  return (
    <Button onClick={() => setOpen(true, tradeData)} variant="outline">
      View <ChartCandlestick className="h-4 w-4" />
    </Button>
  );
};