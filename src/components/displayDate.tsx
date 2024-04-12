"use client";

import { cn } from "@/lib/utils";
import React from "react";

function DisplayDate({
  date,
  className,
}: {
  date: number;
  className?: string;
}) {
  const d = new Date(date);
  return <span className={cn(className)}>{d.toDateString()}</span>;
}

export default DisplayDate;
