import Spinner from "@/components/spinner";
import React from "react";

function loading() {
  return (
    <div className='flex items-center justify-center h-[30vh] w-full'>
      <Spinner className='w-8 h-8' />
    </div>
  );
}

export default loading;
