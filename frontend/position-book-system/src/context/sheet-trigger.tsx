import { Position } from "@/api/models/positions.model";
import React, { createContext, useContext, useState } from "react";

interface SheetContextType {
  open: boolean;
  data: Position;
  setOpen: (open: boolean, data?: Position) => void;
}

const SheetContext = createContext<SheetContextType | undefined>(undefined);

export const SheetProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>({});

  const handleSetOpen = (open: boolean, newData?: any) => {
    try {
      if (!open) {
        setOpen(false);
        setData({});
      } else {
        setOpen(true);
        setData(newData || {});
      }
    } catch (error) {
      console.log("Fail");
      console.error("Error in setOpen:", error);
    }
  };

  return (
    <SheetContext.Provider value={{ open, data, setOpen: handleSetOpen }}>
      {children}
    </SheetContext.Provider>
  );
};

export const useSheet = () => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error("useSheet must be used within a SheetProvider");
  }
  return context;
};
