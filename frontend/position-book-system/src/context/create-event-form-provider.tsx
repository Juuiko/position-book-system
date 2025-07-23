import { sendEvent } from "@/api/post-event";
import { EventFormData } from "@/features/create-event-form/create-event-form";
import React, { createContext, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { TradeEvent } from "@/api/models/positions.model";
import { getEvents } from "@/api/get-event";
import { UseFormReturn } from "react-hook-form";

interface EventFormContextType {
  formIds: number[];
  addForm: () => void;
  removeForm: () => void;
  submitAllEvents: () => void;
  fetchEvents: () => void;
  events: TradeEvent[];
  registerForm: (id: number, formMethods: FormInstance) => void;
}

type FormInstance = UseFormReturn<EventFormData> & {
  triggerValidation: () => Promise<boolean>;
  getValues: () => EventFormData;
};

// TODO - Create endpoint to fetch this (out of scope)
let latestId = 11;

export const EventFormContext = createContext<EventFormContextType | undefined>(
  undefined
);

export const EventFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formIds, setFormIds] = useState<number[]>([]);
  const [events, setEvents] = useState<TradeEvent[]>([]);
  const formRefs = useRef<{ [key: number]: FormInstance }>({});

  const addForm = () => {
    setFormIds((formIds) => [...formIds, latestId + 1]);
    latestId++;
  };

  const removeForm = () => {
    setFormIds((formIds) => {
      if (formIds.length <= 1) return formIds;

      const newFormIds = [...formIds];
      delete formRefs.current[newFormIds.pop()!]; // pop and delete last elm
      latestId = newFormIds[newFormIds.length - 1];

      return newFormIds; // Return a new array to trigger re-render
    });
  };

  const registerForm = (id: number, formMethods: FormInstance) => {
    formRefs.current[id] = formMethods;
  };

  const navigate = useNavigate(); // Initialize navigation function

  // validate & submit all event forms
  const submitAllEvents = async () => {
    let allValid = true;
    const formData: EventFormData[] = [];

    for (const id of formIds) {
      const formInstance = formRefs.current[id];
      if (formInstance) {
        const isValid = await formInstance.triggerValidation();
        if (!isValid) {
          allValid = false;
        } else {
          if (formInstance.getValues().Action === "CANCEL") {
            const tempInstance = formInstance.getValues();
            const matchingEvent = events.find(
              (event) => event.ID == tempInstance.ID && event.Action !== "CANCEL"
            );
            if (matchingEvent) {
              tempInstance.Quantity = matchingEvent.Quantity;
              tempInstance.Security = matchingEvent.Security;
              tempInstance.Account = matchingEvent.Account;
              
            } else {
              console.error("No matching event found");
            }
            formData.push(tempInstance);
          } else {
            formData.push({ ...formInstance.getValues(), ID: id });
          }
        }
      } else {
        alert("Please add & complete at least 1 form before sumitting");
        return;
      }
    }

    if (!allValid) {
      alert("Some forms have errors. Please fix them before submitting.");
      return;
    }

    try {
      sendEvent(formData);
      alert("All forms submitted successfully!");
      navigate("/dashboard/positions-summary");

      await new Promise((resolve) => {
        setFormIds([]);
        formRefs.current = {};
        resolve(null);
      });
    } catch (error) {
      console.error("Error submitting events:", error);
      alert("Failed to submit events. Please try again.");
    }
  };

  const fetchEvents = () => {
    getEvents().then((events: TradeEvent[]) => {
      setEvents(events);
    });
  };

  return (
    <EventFormContext
      value={{ formIds, addForm, removeForm, submitAllEvents, registerForm, fetchEvents, events }}
    >
      {children}
    </EventFormContext>
  );
};
