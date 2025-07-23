import { TradeEvent } from "@/api/models/positions.model";
import { EventFormData } from "@/features/create-event-form/create-event-form";
import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";

export type FormInstance = UseFormReturn<EventFormData> & {
  triggerValidation: () => Promise<boolean>;
  getValues: () => EventFormData;
};

interface EventFormContextType {
  formIds: number[];
  addForm: () => void;
  removeForm: () => void;
  submitAllEvents: () => void;
  fetchEvents: () => void;
  events: TradeEvent[];
  registerForm: (id: number, formMethods: FormInstance) => void;
}

export const EventFormContext = createContext<EventFormContextType | undefined>(
  undefined
);