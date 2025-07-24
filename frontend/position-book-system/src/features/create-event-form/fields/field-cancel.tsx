import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { EventFormData } from "../event-form-type";
import { TradeEvent } from "@/api/models/positions.model";

interface CancelEventFieldProps {
  control: Control<EventFormData>;
  events: TradeEvent[];
}

export function CancelEventField({ control, events }: CancelEventFieldProps) {
  return (
    <FormField
      control={control}
      name="ID"
      render={({ field }) => (
        <FormItem>
          <span>Event To Cancel</span>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value?.toString()}
              name={field.name}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an Event" />
              </SelectTrigger>
              <SelectContent>
                {events.length > 0 ? (
                  events
                    .filter((event) => event.Action !== "CANCEL")
                    .map((event) => (
                      <SelectItem key={event.Account} value={event.Account || "Cancel Event"}>
                        {event.Action} {event.Quantity} units of {event.Security} (ID #{event.Account})
                      </SelectItem>
                    ))
                ) : (
                  <SelectItem disabled value="Empty">
                    No Events Available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}