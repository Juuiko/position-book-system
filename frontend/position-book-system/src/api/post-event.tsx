import { toast } from "sonner";
import { ENDPOINTS } from "./endpoints";
import { TradeEvent } from "./models/positions.model";

export const sendEvent = (data: TradeEvent[]) => {
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
    if (res.status !== 200) {
      toast.error("Error submitting form:" + res.statusText);
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    toast.success("Event successfully sent");
  });
};