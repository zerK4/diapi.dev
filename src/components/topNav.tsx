"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function TopNav() {
  const pathname = usePathname();
  return (
    <div className=' sticky top-0 px-2 md:px-36 lg:px-[15rem] h-10 flex items-end border-b border-zinc-100 dark:border-zinc-900'>
      <div className='flex items-center gap-4 h-full'>
        {navMenu.map((item, index) => {
          return (
            <Link
              href={item.disabled ? "/" : item.link}
              onClick={(e) => item.disabled && e.preventDefault()}
              key={index}
              className={cn(
                "flex items-center gap-1 h-full px-1",
                pathname === item.link ? "border-b border-orange-500" : ""
              )}
            >
              <span
                className={cn(
                  "text-zinc-800 dark:text-zinc-300  text-sm hover:text-zinc-300 dark:hover:text-zinc-700 ease-in-out duration-300",
                  item.disabled ? "opacity-30 pointer-events-none" : ""
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
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
