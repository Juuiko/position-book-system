import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import React from "react";
import { useEventForm } from "@/context/event-form/use-event-form";
import { formSchema } from "./event-form-schema";
import { EventFormData } from "./event-form-type";

export function useCreateEventForm(formId: string) {
  const { registerForm } = useEventForm();
  
  const form = useForm<EventFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Action: "BUY",
      Account: "",
      Security: "",
      Quantity: 0,
    } as EventFormData,
  });

  // Extend form to include custom functions
  const extendedFormMethods = React.useMemo(() => ({
    ...form,
    triggerValidation: () => {
      return form.trigger();
    },
  }), [form]);

  // Register this form instance with the provided ID
  useEffect(() => {
    registerForm(formId, extendedFormMethods);
  }, [formId, registerForm, extendedFormMethods]);

  const actionType = form.watch("Action");
  
  return {
    form,
    actionType,
    triggerValidation: extendedFormMethods.triggerValidation,
  };
}