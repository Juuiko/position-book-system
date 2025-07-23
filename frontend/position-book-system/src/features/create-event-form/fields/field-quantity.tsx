import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { EventFormData } from "../event-form-type";

interface QuantityFieldProps {
  control: Control<EventFormData>;
}

export function QuantityField({ control }: QuantityFieldProps) {
  return (
    <FormField
      control={control}
      name="Quantity"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Quantity</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Enter quantity" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}