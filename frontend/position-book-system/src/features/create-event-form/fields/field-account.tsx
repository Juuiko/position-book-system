import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { EventFormData } from "../event-form-type";

interface AccountFieldProps {
  control: Control<EventFormData>;
}

export function AccountField({ control }: AccountFieldProps) {
  return (
    <FormField
      control={control}
      name="Account"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Account</FormLabel>
          <FormControl>
            <Input placeholder="Enter account name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}