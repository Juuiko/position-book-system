import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CreateEventForm from "../create-event-form/create-event-form";

export default function CreateEventCard({ tradeId }: { tradeId: number }) {
  return (
    <div>
      <Card className="m-8">
        <CardContent>
          <CreateEventForm />
        </CardContent>
        <CardFooter>
          <CardDescription>Trade ID will be: { tradeId }</CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
