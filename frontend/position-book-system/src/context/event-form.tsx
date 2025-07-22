import { useContext } from "react";
import { EventFormContext } from "./create-event-form-provider";

export const useEventForm = () => {
  const context = useContext(EventFormContext);
  if (!context) {
    throw new Error("useEventForm must be used within an EventFormProvider");
  }
  return context;
};