import { Position } from "@/api/models/positions.model";
import React, { useState } from "react";
import { SheetContext } from "./sheet-trigger-context";

export const SheetProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Position | undefined>(undefined);

  const handleSetOpen = (open: boolean, newData?: Position) => {
    try {
      if (!open) {
        setOpen(false);
        setData(undefined);
      } else {
        setOpen(true);
        setData(newData);
      }
    } catch (error) {
      console.log("Fail");
      console.error("Error in setOpen:", error);
    }
  };

  return (
    <SheetContext value={{ open, data, setOpen: handleSetOpen }}>
      {children}
    </SheetContext>
  );
};
