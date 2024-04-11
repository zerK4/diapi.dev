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
import { Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { ContentType } from "@/db/schema";
import { addBookContent } from "@/app/actions/bookActions";
import { toast } from "sonner";

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
      setMessage("Invalid JSON");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          className='my-2 bg-orange-400 text-white hover:bg-orange-500'
        >
          <Plus size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className='min-h-[50vh] max-h-[98vh] overflow-hidden'>
        <DialogHeader className='h-fit'>
          <DialogTitle>Add content</DialogTitle>
        </DialogHeader>
        <div className='min-h-[35vh] max-h-[90vh]'>
          <Textarea onChange={handleChange} className='h-full' />
        </div>
        {message && <div className='text-red-500 w-full'>{message}</div>}
        <DialogFooter className=''>
          <div className='flex flex-col gap-1'>
            {!message && <Button onClick={handleSave}>Save</Button>}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
