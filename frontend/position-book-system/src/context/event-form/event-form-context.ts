import { EventFormData } from "@/features/create-event-form/event-form-type";
import { createContext } from "react";
import { UseFormReturn } from "react-hook-form";

export type FormInstance = UseFormReturn<EventFormData> & {
  triggerValidation: () => Promise<boolean>;
  getValues: () => EventFormData;
};

export interface ExtendedFormMethods extends UseFormReturn<EventFormData> {
  triggerValidation: () => Promise<boolean>;
}

export interface EventFormContextType {
  formIds: string[];
  registerForm: (id: string, formMethods: ExtendedFormMethods) => void;
  getFormData: (id: string) => EventFormData | null;
  getFormInstance: (id: string) => ExtendedFormMethods | null;
  testAllForms: () => Promise<boolean>;
  removeAllForms: () => void;
  getAllFormData: () => Record<string, EventFormData>;
  removeForm: (id: string) => void;
  addForm: (id: string) => void;
}

export const EventFormContext = createContext<EventFormContextType | undefined>(
  undefined
);