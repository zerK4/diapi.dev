import Spinner from "@/components/spinner";
import { Loader } from "lucide-react";
import React from "react";

function loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center w-full">
      <Spinner className="w-8 h-8" />
    </div>
  );
}

export default loading;
