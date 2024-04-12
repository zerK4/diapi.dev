"use client";

import { UserType } from "@/db/schema";
import React from "react";
import { Separator } from "./ui/separator";
import WorkspaceDropdown from "./workspaceDropdown";
import UserDropdown from "./userDropdown";

function Topbar({ user }: { user: UserType }) {
  return (
    <div className='sticky top-0 w-full px-2 md:px-36 lg:px-[15rem] flex justify-between h-16 items-center bg-background'>
      <div className='flex items-center gap-2'>
        <h1>diapi</h1>
        <Separator
          className='-rotate-[55deg] w-6 bg-zinc-700'
          orientation='horizontal'
        />
        <WorkspaceDropdown />
      </div>
      <UserDropdown user={user} />
    </div>
  );
}

export default Topbar;
