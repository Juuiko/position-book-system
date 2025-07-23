import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "../ui/sheet";
import { useSheet } from "@/context/sheet-trigger/use-sheet";
import { TradeEvent } from "@/api/models/positions.model";

function Events({ trades }: { trades: TradeEvent[] }) {
  return (
    <div className="overflow-x-hidden">
      {trades?.map((event, index) => (
        <div key={index}>
          <Card className="m-4">
            <CardContent>
            <Badge variant="outline" 
                   className={`mr-4 text-xl ${
                    event.Action === 'SELL' ? 'bg-red-600' :
                    event.Action === 'BUY' ? 'bg-green-600' :
                    event.Action === 'CANCEL' ? 'bg-orange-600' : ''
                  }`}
            >{event.Action} </Badge> {event.Quantity}units of {event.Security}
            </CardContent>
            <CardFooter className="text-right justify-end">
              <p className="text-xs text-muted-foreground">Event ID: {event.ID}</p>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}

export function TradesSheet() {
  const { open, data, setOpen } = useSheet();

  return (
    <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <SheetContent className="overflow-scroll">
        <SheetHeader>
          <SheetTitle>
            Security: {data?.Security} & Account: {data?.Account}
          </SheetTitle>
          <SheetDescription>Event Log</SheetDescription>
        </SheetHeader>
        <Events trades={data?.Events ?? []} />
      </SheetContent>
    </Sheet>
  );
}
