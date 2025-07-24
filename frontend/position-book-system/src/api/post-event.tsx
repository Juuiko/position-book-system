import { toast } from "sonner";
import { ENDPOINTS } from "./endpoints";
import { CreateTradeEvent } from "./models/positions.model";

export const sendEvent = (data: CreateTradeEvent[]) => {
  const payload = { Events: data };
  fetch(ENDPOINTS.events.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(payload),
  }
  ).then((res) => {
    if (res.status !== 201) {
      toast.error("Error submitting form:" + res.statusText);
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    toast.success("Event successfully sent");
  });
};