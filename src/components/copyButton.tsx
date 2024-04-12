"use client";

import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

function CopyButton({
  children,
  className,
  copyContent,
}: {
  children: React.ReactNode;
  className?: string;
  copyContent: string;
}) {
  const handleClick = () => {
    navigator.clipboard.writeText(copyContent);
    toast.info("Copied to clipboard");
  };
  return (
    <Button
      onClick={handleClick}
      variant={"ghost"}
      size={"icon"}
      className={cn(className)}
    >
      {children}
    </Button>
  );
}

export default CopyButton;
