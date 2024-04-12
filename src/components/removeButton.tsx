"use client";

import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { deleteApiKey } from "@/app/actions/apiKeyActions";
import { toast } from "sonner";

function RemoveButton({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id: string;
}) {
  const handleClick = () => {
    console.log(className, id);
    const promise = deleteApiKey(id);
    toast.promise(promise, {
      loading: "Deleting...",
      success: "API key deleted",
      error: "Something went wrong",
    });
  };

  return (
    <Button
      onClick={handleClick}
      variant={"destructive"}
      size={"icon"}
      className={cn(className)}
    >
      {children}
    </Button>
  );
}

export default RemoveButton;
