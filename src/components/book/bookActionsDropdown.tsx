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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { createApiKey } from "@/app/actions/apiKeyActions";
import { toast } from "sonner";

export const BookActionsDropdown = ({ data }: { data: FullContentType }) => {
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
          {data.apiKeys.length !== 0 ? (
            <>
              <DropdownMenuItem className='flex gap-2 items-center'>
                <Copy size={16} />
                Copy rest endpoint
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  window.navigator.clipboard.writeText(data.apiKeys[0].key)
                }
                className='flex gap-2 items-center'
              >
                <Copy size={16} />
                Copy api key
              </DropdownMenuItem>
            </>
          ) : (
            <AddApiKey data={data}>
              <Button
                className='p-0 h-8 px-2 flex w-full justify-start items-center gap-2'
                variant={"ghost"}
              >
                <Plus size={16} />
                Add api key
              </Button>
            </AddApiKey>
          )}
          <DropdownMenuItem className='flex gap-2 items-center'>
            <Sparkles size={16} />
            Populate
          </DropdownMenuItem>
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

const AddApiKey = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: FullContentType;
}) => {
  const [name, setName] = useState("");
  const handleCreate = () => {
    if (!name || name.length === 0) {
      toast.error("Name cannot be empty");
      return;
    }

    const promise = createApiKey(data.id, name);
    toast.promise(promise, {
      loading: "Creating api key...",
      success: ({ data, message }) => {
        return <div>{message}</div>;
      },
      error: "Something went wrong",
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a API key</DialogTitle>
          <DialogDescription>
            This API key will be added and will take effect only for {data.name}
            .
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
          />
        </div>
        <DialogFooter>
          <Button onClick={handleCreate}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
