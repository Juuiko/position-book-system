import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import CreateEventForm from "../create-event-form/create-event-form";
import { TradeEvent } from "@/api/models/positions.model";
import { X } from "lucide-react";

type CreateEventCardProps = {
  cardKey: string;
  data: TradeEvent[];
  onRemove: (key: string) => void;
};

export default function CreateEventCard({ cardKey, data, onRemove }: CreateEventCardProps) {
  return (
    <div>
      <Card className="m-8 pt-0">
        <CardHeader>
          <button
              onClick={() => onRemove(cardKey)}
              className="absolute top-10 right-10 text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
              aria-label="Remove card"
            >
            <X size={18} />
          </button>
        </CardHeader>
        <CardContent>
          <CreateEventForm events={data} formId={cardKey} />
        </CardContent>
      </Card>
    </div>
  );
}
