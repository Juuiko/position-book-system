import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logs, NotebookPen } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { ModeToggle } from "../theme-select/theme-select";
import { AdminDialog } from "../admin-dialog/admin-dialog";

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <h2 className="text-2xl font-bold">Position Book System</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="Position Summary">
                <SidebarMenuButton
                  asChild
                  isActive={
                    location.pathname === "/dashboard/positions-summary"
                  }
                >
                  <NavLink to="/dashboard/positions-summary">
                    <Logs />
                    <span>Position Summary</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === "/dashboard/create-event"}
                >
                  <NavLink to="/dashboard/create-event">
                    <NotebookPen />
                    <span>Create Events</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="list-none">
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <AdminDialog />
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <ModeToggle />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
