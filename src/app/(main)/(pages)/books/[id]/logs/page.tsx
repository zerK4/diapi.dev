import EmptyPage from "@/components/emptyPage";
import { ListTree } from "lucide-react";
import React from "react";

function page() {
  return (
    <div>
      <EmptyPage
        content={
          <div className='flex flex-col justify-center items-center gap-2 animate-pulse'>
            <ListTree size={40} />
            <span>Coming soon...</span>
          </div>
        }
      />
    </div>
  );
}

export default page;
