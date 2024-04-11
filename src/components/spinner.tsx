import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";

function Spinner(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("flex items-center justify-center", props.className)}
    >
      <Loader className="animate-spin h-full w-full" />
    </div>
  );
}

export default Spinner;
