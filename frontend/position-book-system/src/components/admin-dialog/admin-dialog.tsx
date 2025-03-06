import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "../ui/sidebar";
import { getClearDatabase, postPopulateDatabase } from "@/api/admin-calls";

export function AdminDialog() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <Settings />
          <span>Admin Actions</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            getClearDatabase();
          }}
        >
          Clear Database
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => postPopulateDatabase()}>
          Populate Database
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
