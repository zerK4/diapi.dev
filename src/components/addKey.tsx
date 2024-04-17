"use client";

import { createApiKey } from "@/app/actions/apiKeyActions";
import { FullContentType } from "@/db/schema";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const AddKey = ({
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
            placeholder="Name"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleCreate}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
