"use client";

import { MoreHorizontal, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useBook } from "@/store/book";
import { ContentType } from "@/db/schema";

export const ActionsDropdown = ({
  children = null,
  book,
}: {
  children?: React.ReactNode;
  book?: ContentType;
}) => {
  const { removeBook } = useBook();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[12rem]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          {children}
          <Button
            variant={"ghost"}
            onClick={() => removeBook(book!.id)}
            className="flex items-center gap-2 p-0 h-8 w-full hover:bg-red-500 text-red-500 hover:text-white justify-start px-2"
          >
            <Trash size={16} className="" />
            Delete
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
