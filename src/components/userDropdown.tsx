"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronsUpDown, LogOut, Plus, Settings } from "lucide-react";
import { Separator } from "./ui/separator";
import { UserType } from "@/db/schema";
import { useUser } from "@/store/user";

function UserDropdown({ user }: { user: UserType }) {
  const { logout } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent hover:bg-zinc-500/20 text-foreground w-10 h-10 flex justify-center items-center p-0 rounded-full border">
          {user &&
            user?.name
              ?.split(" ")
              .map((name) => name.split("")[0])
              .join("")
              .toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[13rem] p-0" align="end">
        <DropdownMenuGroup className="flex flex-col gap-1 bg-zinc-100 dark:bg-zinc-900/50 h-full px-4 py-4">
          <h2 className="text-md font-semibold">Profile</h2>
        </DropdownMenuGroup>
        <Separator className="" />
        <DropdownMenuGroup className="py-2 px-1">
          <DropdownMenuItem className="flex items-center gap-2 group/menuItem px-2">
            <Settings size={14} className="group-hover/menuItem:animate-spin" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={logout}
            className="flex items-center gap-2 group/menuItem px-2"
          >
            <LogOut size={14} className="group-hover/menuItem:animate-bounce" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
