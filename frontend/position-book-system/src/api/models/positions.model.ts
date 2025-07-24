export type CreateTradeEvent = {
  Action: "BUY" | "SELL" | "CANCEL";
  Account?: string;
  Security?: string;
  Quantity?: number;
};

export type TradeEvent = {
  ID: number;
  Action: "BUY" | "SELL" | "CANCEL";
  Account?: string;
  Security?: string;
  Quantity?: number;
};

export type PositionWrapper = {
  Positions: Position[]
}

export type Position = {
  Account: string;
  Security: string;
  Quantity: number;
  Events: TradeEvent[];
};
