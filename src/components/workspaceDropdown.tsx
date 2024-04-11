import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronsUpDown, Plus } from "lucide-react";
import { Separator } from "./ui/separator";

function WorkspaceDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent hover:bg-zinc-500/20 text-foreground w-[10rem] flex justify-between">
          <span>Default</span>
          <ChevronsUpDown className="" size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <DropdownMenuGroup className="flex flex-col gap-1 py-3 px-4 bg-zinc-100 dark:bg-zinc-900/50">
          <h2 className="text-md font-semibold">Workspaces</h2>
          <p className="text-sm text-zinc-500">
            workspaces are not yet supported
          </p>
        </DropdownMenuGroup>
        <Separator />
        <DropdownMenuGroup className="py-2 px-1">
          <Button className="w-full bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-500/20 text-foreground justify-start">
            <Plus size={16} />
            <span className="ml-2">New Workspace</span>
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default WorkspaceDropdown;
