import { Button } from "@/components/ui/button";
import { useEventForm } from "@/context/event-form/use-event-form";
import CreateEventCard from "@/features/create-event-card/create-event-card";
import { useEffect, useRef } from "react";

export default function CreateEvent() {
  const { formIds, addForm, removeForm, submitAllEvents, fetchEvents } = useEventForm();

  const initialFormAdded = useRef(false);
  useEffect(() => {
    if (formIds.length === 0 && !initialFormAdded.current) {
      initialFormAdded.current = true;
      addForm();
    }
  }, [addForm, formIds.length]);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-4 w-full">
      <div>
        <h1>Create New Events</h1>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {formIds.map((id) => (
          <div key={id} className="relative">
            <CreateEventCard />
          </div>
        ))}
      </div>

      <div className="fixed bottom-4 right-4">
        <div className="flex flex-col">
          <Button
            onClick={addForm}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg mb-4"
          >
            Add to Batch Event
          </Button>
          <Button
            onClick={removeForm}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg mb-4"
          >
            Remove from Batch Event
          </Button>
          <Button
            onClick={submitAllEvents}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
          >
            Submit All
          </Button>
        </div>
      </div>
    </div>
  );
}
