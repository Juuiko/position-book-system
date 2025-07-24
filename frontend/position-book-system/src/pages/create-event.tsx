import { getEvents } from "@/api/get-event";
import { TradeEvent } from "@/api/models/positions.model";
import { sendEvent } from "@/api/post-event";
import { Button } from "@/components/ui/button";
import { useEventForm } from "@/context/event-form/use-event-form";
import CreateEventCard from "@/features/create-event-card/create-event-card";
import { EventFormData } from "@/features/create-event-form/event-form-type";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type CreateCardProps = {
  id: string;
};

export default function CreateEvent() {
  const { addForm, removeForm, testAllForms, removeAllForms, getAllFormData } = useEventForm();
  const [events, setEvents] = useState<TradeEvent[]>([]);
  const [cards, setCards] = useState<CreateCardProps[]>([]);

  const addCard = () => {
    const newCard = { id: generateId() };
    setCards([...cards, newCard]);
    addForm(newCard.id); // add form to context
  };

  const deleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id)); // remove card from state
    removeForm(id); // remove form from context
  };

  const fetchEvents = () => {
    getEvents().then((events: TradeEvent[]) => {
      setEvents(events);
    });
  };
  useEffect(() => {
    fetchEvents(); // fetch trade events when component mounts
  }, []);

  const navigate = useNavigate(); // Initialize navigation function

  const sendAllEvents = async () => {
    const allData = getAllFormData();
    const formData: EventFormData[] = [];


    try {
      const isValid = await testAllForms();
      if(!isValid) {
        alert("Please complete all forms before submitting.");
        return; // Exit early
      }
      console.log("testAllForms result:", isValid);

      for (const key in allData) {
        formData.push(allData[key]);
      }

      sendEvent(formData);
      alert("All forms submitted successfully!");
      navigate("/dashboard/positions-summary");

      await new Promise((resolve) => {
        removeAllForms();
        setCards([]); // reset cards to initial state
        resolve(true);
      });
    } catch (error) {
      console.error("Error submitting events:", error);
      alert("Failed to submit events. Please try again.");
    }
  };

  return (
    <div className="p-4 w-full">
      <div>
        <h1>Create New Events</h1>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="relative">
            <CreateEventCard
              cardKey={card.id}
              data={events}
              onRemove={deleteCard}
            />
          </div>
        ))}
      </div>

      <div className="fixed bottom-4 right-4">
        <div className="flex flex-col">
          <Button
            onClick={addCard}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg mb-4"
          >
            Add to Batch Event
          </Button>
          <Button
            onClick={sendAllEvents}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full shadow-lg"
          >
            Submit All
          </Button>
        </div>
      </div>
    </div>
  );
}

function generateId() {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

