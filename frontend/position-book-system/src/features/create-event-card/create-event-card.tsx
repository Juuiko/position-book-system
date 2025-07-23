import {
  Card,
  CardContent,
} from "@/components/ui/card";
import CreateEventForm from "../create-event-form/create-event-form";

export default function CreateEventCard() {
  return (
    <div>
      <Card className="m-8">
        <CardContent>
          <CreateEventForm />
        </CardContent>
      </Card>
    </div>
  );
}
