"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEvent, useState } from "react";
import { Button } from "../ui/button";
import { Plus, Sparkles } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { ContentType } from "@/db/schema";
import { addBookContent } from "@/app/actions/bookActions";
import { toast } from "sonner";
import { faker } from "@faker-js/faker";
import { createRandomUser } from "@/lib/generator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const AddContent = ({ data }: { data: ContentType }) => {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const promise = addBookContent({
      content,
      bookId: data.id,
    });

    toast.promise(promise, {
      loading: "Saving...",
      success: ({ data, message }) => {
        return <div>{message}</div>;
      },
      error: "Something went wrong",
    });
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const data = JSON.parse(e.target.value);
      setMessage("");
      setContent(data);
    } catch (err) {
      setContent(e.target.value);
      setMessage("Invalid JSON");
    }
  };

  const handlePopulate = () => {
    const data: any = [];
    Promise.all(
      Array.from({ length: 50 }).map((u, i) => {
        const user = createRandomUser();
        user.index = i + 1;
        data.push(user);
      }),
    ).then(() => {
      setContent(data);
      const el = document.getElementById("text-code") as HTMLTextAreaElement;
      if (!el) return;

      el.value = JSON.stringify(data, null, 2);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          className="my-2 bg-orange-400 text-white hover:bg-orange-500"
        >
          <Plus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-[50vh] max-h-[98vh] overflow-hidden">
        <DialogHeader className="h-fit">
          <DialogTitle>Add content</DialogTitle>
        </DialogHeader>
        <div className="min-h-[35vh] max-h-[90vh]">
          <Textarea id="text-code" onChange={handleChange} className="h-full" />
        </div>
        {message && <div className="text-red-500 w-full">{message}</div>}
        <DialogFooter className="">
          <div className="flex justify-between items-center w-full">
            <PopulateDropdown handlePopulate={handlePopulate} />
            {!message && <Button onClick={handleSave}>Save</Button>}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PopulateDropdown = ({
  handlePopulate,
}: {
  handlePopulate: () => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white">
          <Sparkles size={16} />
          Populate
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[12rem] p-0">
        <DropdownMenuGroup className="border-b px-2 py-4">
          Populate options
        </DropdownMenuGroup>
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem
            onClick={handlePopulate}
            className="flex items-center gap-2"
          >
            <Sparkles size={16} />
            Users
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
