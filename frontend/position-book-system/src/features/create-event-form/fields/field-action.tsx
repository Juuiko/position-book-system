import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { EventFormData } from "../event-form-type";

interface ActionFieldProps {
  control: Control<EventFormData>;
}

export function ActionField({ control }: ActionFieldProps) {
  return (
    <FormField
      control={control}
      name="Action"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Action</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              orientation={"horizontal"}
              className="flex grid-flow-col"
            >
              <FormItem className="flex items-center">
                <RadioGroupItem value="BUY" />
                <FormLabel className="mr-5">Buy</FormLabel>
              </FormItem>
              <FormItem className="flex items-center">
                <RadioGroupItem value="SELL" />
                <FormLabel className="mr-5">Sell</FormLabel>
              </FormItem>
              <FormItem className="flex items-center">
                <RadioGroupItem value="CANCEL" />
                <FormLabel className="mr-5">Cancel</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}