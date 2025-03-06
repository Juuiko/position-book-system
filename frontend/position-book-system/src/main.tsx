import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Dashboard from "./layouts/dashboard.tsx";
import CreateEvent from "./pages/create-event.tsx";
import PositionSummary from "./pages/position-summary.tsx";
import { ThemeProvider } from "./context/theme-provider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="positions-summary" element={<PositionSummary />} />
          <Route path="create-event" element={<CreateEvent />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard/positions-summary" />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
