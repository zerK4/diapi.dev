"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavMenu({
  data,
  className,
}: {
  data: {
    name: string;
    link: string;
    disabled: boolean;
  }[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center gap-4 h-full", className)}>
      {data.map((item, index) => {
        return (
          <Link
            href={item.disabled ? "/" : item.link}
            onClick={(e) => item.disabled && e.preventDefault()}
            key={index}
            className={cn(
              "flex items-center gap-1 h-full px-1 pb-2",
              pathname === item.link ? "border-b border-orange-500" : "",
            )}
          >
            <span
              className={cn(
                "text-zinc-800 dark:text-zinc-300  text-sm hover:text-zinc-300 dark:hover:text-zinc-700 ease-in-out duration-300",
                item.disabled ? "opacity-30 pointer-events-none" : "",
              )}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default NavMenu;
