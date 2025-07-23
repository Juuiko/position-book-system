import { z } from "zod";
import { formSchema, buySellSchema, cancelSchema } from "./event-form-schema";
import { Control } from "react-hook-form";

// Main EventFormData type - this is a discriminated union
export type EventFormData = z.infer<typeof formSchema>;

// Individual action types for better type safety
export type BuySellFormData = z.infer<typeof buySellSchema>;
export type CancelFormData = z.infer<typeof cancelSchema>;

// Type guards for runtime type checking
export function isBuySellAction(data: EventFormData): data is BuySellFormData {
  return data.Action === "BUY" || data.Action === "SELL";
}

export function isCancelAction(data: EventFormData): data is CancelFormData {
  return data.Action === "CANCEL";
}

// Helper type for form field props
export type FormFieldProps<T extends keyof EventFormData> = {
  control: Control<EventFormData>;
  name: T;
};

// Event type for display purposes (when form is submitted/saved)
export interface SavedEvent {
  Action: "BUY" | "SELL" | "CANCEL";
  Account?: string;
  Security?: string;
  Quantity?: number;
  createdAt?: Date;
}