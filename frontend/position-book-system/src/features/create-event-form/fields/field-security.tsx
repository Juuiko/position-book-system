import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { EventFormData } from "../event-form-type";

interface SecurityFieldProps {
  control: Control<EventFormData>;
}

export function SecurityField({ control }: SecurityFieldProps) {
  return (
    <FormField
      control={control}
      name="Security"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Security</FormLabel>
          <FormControl>
            <Input placeholder="Enter security ticker symbol" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}