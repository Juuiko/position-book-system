import { ENDPOINTS } from "./endpoints";

export const sendEvent = (
  data: (
    | {
      ID: number;
      Action: "BUY" | "SELL";
      Account: string;
      Security: string;
      Quantity: number;
    }
    | {
      ID: number;
      Action: "CANCEL";
      Account?: string;
      Security?: string;
      Quantity?: number;
    }
  )[]) => {
  const payload = { Events: data };
  try {
    const response = fetch(ENDPOINTS.events.create, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    });
    console.log(response);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
