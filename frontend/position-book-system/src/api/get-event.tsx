import { ENDPOINTS } from "./endpoints";
import { TradeEvent } from "./models/positions.model";

export const getEvents = async (): Promise<TradeEvent[]> => {
  const res = await fetch(ENDPOINTS.events.getAllEvents, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  return res.json() as Promise<TradeEvent[]>;
};
