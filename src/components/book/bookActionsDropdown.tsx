"use client";

import { ContentType, FullContentType } from "@/db/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Copy, Plus, Sparkles, Trash } from "lucide-react";
import { useBook } from "@/store/book";
import { AddKey } from "../addKey";

export const BookActionsDropdown = ({ data }: { data: FullContentType }) => {
  const { removeBook } = useBook();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-0 min-w-[12rem]">
        <DropdownMenuGroup className="px-3 border-b py-4">
          <h2 className="text-sm font-bold">Book Actions</h2>
        </DropdownMenuGroup>
        <DropdownMenuGroup className="py-2 px-1">
          {data.apiKeys.length !== 0 ? (
            <>
              <DropdownMenuItem
                onClick={() =>
                  window.navigator.clipboard.writeText(
                    `${process.env.NEXT_PUBLIC_AE}/${process.env.NEXT_PUBLIC_AEA}/books/${data.apiKeys[0].key}/all`,
                  )
                }
                className="flex gap-2 items-center"
              >
                <Copy size={16} />
                Copy rest endpoint
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  window.navigator.clipboard.writeText(data.apiKeys[0].key)
                }
                className="flex gap-2 items-center"
              >
                <Copy size={16} />
                Copy api key
              </DropdownMenuItem>
            </>
          ) : (
            <AddKey data={data}>
              <Button
                className="p-0 h-8 px-2 flex w-full justify-start items-center gap-2"
                variant={"ghost"}
              >
                <Plus size={16} />
                Add api key
              </Button>
            </AddKey>
          )}
          <DropdownMenuItem
            onClick={() => removeBook(data.id)}
            className="flex gap-2 items-center"
          >
            <Trash size={16} className="text-red-500" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
