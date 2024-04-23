"use client";

import { ActionsDropdown } from "@/components/book/actionsDropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { FullContentType } from "@/db/schema";
import { handleCopy } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, CopySlash, Link2Icon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<FullContentType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          <Link
            href={`/books/${row.original.id}`}
            className="flex items-center gap-2 font-bold text-lg"
          >
            <Link2Icon size={16} />
            {row.original.name}
          </Link>
          <span>
            Content length:{" "}
            {Array.isArray(row.original.content)
              ? row.original.content.length
              : 0}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "content",
    header: () => {
      return <div className="w-full flex justify-center">Content</div>;
    },
    cell: ({}) => {
      return <div className="flex w-full justify-center">asd</div>;
    },
  },
  {
    id: "actions",
    header: ({ table }) => {
      return (
        <div className="w-full flex justify-end">
          {table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate") ? (
            <ActionsDropdown />
          ) : null}
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="w-full flex justify-end">
          <ActionsDropdown book={row.original}>
            {row.original.apiKeys.length !== 0 ? (
              <>
                <DropdownMenuItem
                  onClick={() => handleCopy(row.original.apiKeys[0].key)}
                  className="flex items-center gap-2"
                >
                  <CopySlash size={16} />
                  Copy API key
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleCopy(
                      `${process.env.NEXT_PUBLIC_AE}/${process.env.NEXT_PUBLIC_AEA}`,
                    )
                  }
                  className="flex items-center gap-2"
                >
                  <Copy size={16} />
                  Copy base url
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    handleCopy(
                      `${process.env.NEXT_PUBLIC_AE}/${process.env.NEXT_PUBLIC_AEA}/books/${row.original.apiKeys[0].key}/all`,
                    )
                  }
                  className="flex items-center gap-2"
                >
                  <Copy size={16} />
                  Copy API endpoint
                </DropdownMenuItem>
              </>
            ) : null}
          </ActionsDropdown>
        </div>
      );
    },
  },
];
