"use client";

import React from "react";
import NavMenu from "./navMenu";

function TopNav() {
  return (
    <div className=" sticky top-0 px-2 md:px-36 lg:px-[15rem] h-10 flex items-end border-b border-zinc-100 dark:border-zinc-900">
      <NavMenu data={navMenu} />
    </div>
  );
}

export default TopNav;

const navMenu = [
  {
    name: "Home",
    link: "/",
    disabled: false,
  },
  {
    name: "Books",
    link: "/books",
    disabled: false,
  },
  {
    name: "Buckets",
    link: "/buckets",
    disabled: true,
  },
];
