import { Outlet } from "react-router";
import { AppSidebar } from "../components/sidebar/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { EventFormProvider } from "@/context/event-form/create-event-form";

export default function Dashboard() {
  return (
    <div>
      <SidebarProvider>
        <EventFormProvider>
          <AppSidebar />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </EventFormProvider>
      </SidebarProvider>
    </div>
  );
}
