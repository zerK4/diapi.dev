"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import anime from "animejs";
import AddBook from "./addBook";
import { Button } from "./ui/button";
import { Diapi } from "diapio";
import { ContentApiResponse } from "../../diapio.config";

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
  const diapi = new Diapi<ContentApiResponse>({
    apiKey: "diapi-ba43d06f-c61a-478d-9762-dc4c89fac206-w9CEUH3jtJL7jEn834X8co",
    baseUrl: "https://apidiapidev-production.up.railway.app/api/v1",
  });

  const getSmth = async () => {
    const { message, content } = await diapi.getAll();

    console.log(message, content, "asd");
  };

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
      <Button className="fixed bottom-2 left-2" onClick={getSmth}>
        Test diapi
      </Button>
    </div>
  );
}

export default PageBanner;
