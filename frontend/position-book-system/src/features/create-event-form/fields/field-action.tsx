import { FormField } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control } from "react-hook-form";
import { EventFormData } from "../event-form-type";
import { Label } from "@radix-ui/react-label";

interface ActionFieldProps {
  control: Control<EventFormData>;
}

export function ActionField({ control }: ActionFieldProps) {
  return (
    <FormField
      control={control}
      name="Action"
      render={({ field }) => (
        <div>
          <span>Action</span>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            orientation={"horizontal"}
            className="flex grid-flow-col"
            id="action-radio-group"
            {...field}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="BUY" id="buy" />
              <Label htmlFor="buy">Buy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="SELL" id="sell" />
              <Label htmlFor="sell">Sell</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="CANCEL" id="cancel" />
              <Label htmlFor="cancel">Cancel</Label>
            </div>
          </RadioGroup>
        </div>
      )}
    />
  );
}