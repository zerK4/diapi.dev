import React from "react";
import NothingHere from "./icons/nothingHere";

function EmptyPage({ content }: { content: string }) {
  return (
    <div className="min-h-[20vh] flex items-center justify-center text-zinc-500 px-2 md:px-36 lg:px-[15rem]">
      {content}
    </div>
  );
}

export default EmptyPage;
