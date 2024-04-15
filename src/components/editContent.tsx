"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Pen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { FullContentType } from "@/db/schema";
import { updateBookContent } from "@/app/actions/bookActions";
import { toast } from "sonner";

export function EditContent({ data }: { data: FullContentType }) {
  const [value, setValue] = useState(JSON.stringify(data.content, null, 2));
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    console.log(data, "this is data");
    try {
      const content = JSON.parse(value);
      const promise = updateBookContent({
        content,
        key: data.apiKeys[0].key,
      });

      toast.promise(promise, {
        loading: "Saving...",
        success: "Saved",
        error: "Failed to save",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setMessage("");
      setValue(e.target.value);
      JSON.parse(e.target.value);
    } catch (e) {
      console.error(e);
      setMessage("Invalid JSON");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="sticky top-2" size={"icon"}>
          <Pen size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-h-[50vh] max-h-[90vh]">
        <DialogHeader className="">
          <DialogTitle>Edit Content</DialogTitle>
        </DialogHeader>
        <div className="min-h-[50vh] max-h-[90vh]">
          <Textarea
            value={value}
            onChange={(e) => handleChange(e)}
            className="h-full"
          />
        </div>
        <DialogFooter>
          <div className="w-full flex items-center justify-between">
            <span className="text-red-500">{message}</span>
            {!message && <Button onClick={handleSave}>Save</Button>}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
