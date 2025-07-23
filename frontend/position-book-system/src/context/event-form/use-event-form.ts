import { useContext } from "react";
import { EventFormContext } from "./event-form-context";

export const useEventForm = () => {
  const context = useContext(EventFormContext);
  if (!context) {
    throw new Error("useEventForm must be used within an EventFormProvider");
  }
  return context;
};