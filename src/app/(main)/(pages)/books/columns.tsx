"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ContentType } from "@/db/schema";
import { useBook } from "@/store/book";
import { ColumnDef } from "@tanstack/react-table";
import {
  Copy,
  CopySlash,
  Link2Icon,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<ContentType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <Link
          href={`/books/${row.original.id}`}
          className='flex items-center gap-2'
        >
          <Link2Icon size={16} />
          {row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "content",
    header: () => {
      return <div className='w-full flex justify-center'>Content</div>;
    },
    cell: ({ row }) => {
      return <div className='flex w-full justify-center'>asd</div>;
    },
  },
  {
    id: "actions",
    header: ({ table }) => {
      return (
        <div className='w-full flex justify-end'>
          {table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate") ? (
            <ActionsDropdown />
          ) : null}
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className='w-full flex justify-end'>
          <ActionsDropdown row={row}>
            <>
              <DropdownMenuItem className='flex items-center gap-2'>
                <CopySlash size={16} />
                Copy API key
              </DropdownMenuItem>
              <DropdownMenuItem className='flex items-center gap-2'>
                <Copy size={16} />
                Copy API endpoint
              </DropdownMenuItem>
            </>
          </ActionsDropdown>
        </div>
      );
    },
  },
];

const ActionsDropdown = ({
  children = null,
  row,
}: {
  children?: React.ReactNode;
  row?: any;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-[12rem]'>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          {children}
          <DropdownMenuItem
            onClick={() => useBook.getState().removeBook(row.original.id)}
            className='flex items-center gap-2'
          >
            <Trash size={16} className='text-red-500' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
