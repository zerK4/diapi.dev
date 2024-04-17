"use client";

import { AddKey } from "@/components/addKey";
import CopyButton from "@/components/copyButton";
import RemoveButton from "@/components/removeButton";
import { Button } from "@/components/ui/button";
import { ExtendedApiKeyType } from "@/db/schema";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, Plus, Trash } from "lucide-react";

export const columns: ColumnDef<ExtendedApiKeyType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span>{row.original.name}</span>
          <span className="text-sm font-semibold text-zinc-500">
            Book: {row.original.content.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "key",
    header: "Key",
    cell: ({ row }) => {
      return (
        <div className="max-w-[15rem] whitespace-nowrap overflow-hidden">
          {row.original.key}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: ({ table }) => {
      return (
        <div className="flex justify-end">
          <Button className="h-8 w-8" size="icon">
            <Plus size={16} />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 w-full justify-end">
          <CopyButton copyContent={row.original.key} className="h-8 w-8">
            <Copy size={16} />
          </CopyButton>
          <RemoveButton id={row.original.id} className="h-8 w-8">
            <Trash size={16} />
          </RemoveButton>
        </div>
      );
    },
  },
];
