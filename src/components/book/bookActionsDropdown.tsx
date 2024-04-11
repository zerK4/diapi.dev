"use client";

import { ContentType } from "@/db/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Copy, Settings, Sparkles, Trash } from "lucide-react";
import { SettingsSheet } from "./settingsSheet";
import { useBook } from "@/store/book";

export const BookActionsDropdown = ({ data }: { data: ContentType }) => {
  const { removeBook } = useBook();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='p-0 min-w-[12rem]'>
        <DropdownMenuGroup className='px-3 border-b py-4'>
          <h2 className='text-sm font-bold'>Book Actions</h2>
        </DropdownMenuGroup>
        <DropdownMenuGroup className='py-2 px-1'>
          <DropdownMenuItem className='flex gap-2 items-center'>
            <Copy size={16} />
            Copy rest endpoint
          </DropdownMenuItem>
          <DropdownMenuItem className='flex gap-2 items-center'>
            <Copy size={16} />
            Copy api key
          </DropdownMenuItem>
          <DropdownMenuItem className='flex gap-2 items-center'>
            <Sparkles size={16} />
            Populate
          </DropdownMenuItem>
          <SettingsSheet data={data}>
            <Button
              className='p-0 h-8 px-2 flex items-center justify-start gap-2 w-full'
              variant={"ghost"}
            >
              <Settings size={16} />
              Settings
            </Button>
          </SettingsSheet>
          <DropdownMenuItem
            onClick={() => removeBook(data.id)}
            className='flex gap-2 items-center'
          >
            <Trash size={16} className='text-red-500' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
