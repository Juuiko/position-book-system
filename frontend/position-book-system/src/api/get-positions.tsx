import { ENDPOINTS } from "./endpoints";
import { Position, PositionWrapper } from "./models/positions.model";

export const getPositions = async (): Promise<Position[]> => {
  const res = await fetch(ENDPOINTS.events.getAllPositions, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const data = await res.json() as PositionWrapper;
  return data.Positions;
};
