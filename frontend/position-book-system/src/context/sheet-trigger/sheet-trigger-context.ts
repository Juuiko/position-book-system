import { Position } from "@/api/models/positions.model";
import { createContext } from "react";

interface SheetContextType {
  open: boolean;
  data: Position | undefined;
  setOpen: (open: boolean, data?: Position) => void;
}

export const SheetContext = createContext<SheetContextType | undefined>(undefined);