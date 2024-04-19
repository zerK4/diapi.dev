"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import anime from "animejs";
import AddBook from "./addBook";
// import { Button } from "./ui/button";
// import { Diapi } from "diapio";

function PageBanner({
  title = undefined,
  add = true,
  children = null,
}: {
  title?: string;
  add?: boolean;
  children?: React.ReactNode;
}) {
  const pathName = usePathname();
  const titleRef = useRef<HTMLHeadingElement>(null);
  // const diapi = new Diapi(
  //   "diapi-03525a0b-78bc-4f1f-a0db-6fc4e6e0c30d-dqP3gupqzeMXqPDnSrZRLW",
  // );

  // const getSmth = async () => {
  //   const { content, message } = await diapi.removeOne({
  //     id: "",
  //   });
  //   console.log(content, message);
  // };

  useEffect(() => {
    anime({
      targets: titleRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 500,
      easing: "easeInOutSine",
    });
  }, [titleRef, pathName]);

  return (
    <div className="h-40 flex relative items-center w-full justify-between px-2 md:px-36 lg:px-[15rem] border-b border-zinc-100 dark:border-zinc-900">
      <h2
        ref={titleRef}
        className="text-2xl font-bold opacity-0 translate-y-10"
      >
        {!title &&
          pathName
            .split("/")
            [pathName.split("/").length - 1].charAt(0)
            .toUpperCase() +
            pathName.split("/")[pathName.split("/").length - 1].slice(1)}
        {title}
      </h2>
      <div id="page-banner-children">{children}</div>
      {add && <AddBook />}
      {/* <Button onClick={getSmth}>Test diapi</Button> */}
    </div>
  );
}

export default PageBanner;
