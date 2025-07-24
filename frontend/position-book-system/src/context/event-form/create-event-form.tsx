import { EventFormData } from "@/features/create-event-form/event-form-type";
import React, { useState, useCallback } from "react";
import { EventFormContext, EventFormContextType, ExtendedFormMethods } from "./event-form-context";

export const EventFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [formIds, setFormIds] = useState<string[]>([]);
  const [formInstances, setFormInstances] = useState<Record<string, ExtendedFormMethods>>({});

  const registerForm = useCallback((id: string, formMethods: ExtendedFormMethods) => {
    setFormInstances(prev => ({
      ...prev,
      [id]: formMethods
    }));
  }, []);

  const addForm = useCallback((id: string) => {
    setFormIds(prev => [...prev, id]);
  }, []);

  const removeForm = useCallback((id: string) => {
    setFormIds(prev => prev.filter(formId => formId !== id));
    setFormInstances(prev => {
      const newInstances = { ...prev };
      delete newInstances[id];
      return newInstances;
    });
  }, []);

  const getFormData = useCallback((id: string): EventFormData | null => {
    const formInstance = formInstances[id];
    if (!formInstance) {
      console.warn(`Form with id "${id}" not found`);
      return null;
    }
    return formInstance.getValues();
  }, [formInstances]);

  const getFormInstance = useCallback((id: string): ExtendedFormMethods | null => {
    return formInstances[id] || null;
  }, [formInstances]);

  const testAllForms = async (): Promise<boolean> => {
    let testsPassed = true;

    console.log("Testing all forms:", formIds);

    formIds.every(id => {
      const formInstance = formInstances[id];
      if (!formInstance) {
        console.warn(`Form with id "${id}" not found`);
        return false;
      }
      formInstance.triggerValidation().then(isValid => {
        console.log(`Form with id "${id}" validation result:`, isValid);
        if (!isValid) {
          console.warn(`Form with id "${id}" is invalid`);
          testsPassed = false;
        }
      });
    })

    return testsPassed;
  };

  const removeAllForms = useCallback(() => {
    setFormIds([]);
    setFormInstances({});
  }, []);

  const getAllFormData = useCallback((): Record<string, EventFormData> => {
    const allData: Record<string, EventFormData> = {};
    
    Object.entries(formInstances).forEach(([id, formInstance]) => {
      allData[id] = formInstance.getValues();
    });
    
    return allData;
  }, [formInstances]);

  const contextValue: EventFormContextType = {
    formIds,
    getFormData,
    getFormInstance,
    testAllForms,
    removeAllForms,
    getAllFormData,
    removeForm,
    addForm,
    registerForm
  };

  return (
    <EventFormContext value={contextValue}>
      {children}
    </EventFormContext>
  );

};
