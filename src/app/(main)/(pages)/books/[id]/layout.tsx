import { getContentById } from "@/app/actions/bookActions";
import { AddContent } from "@/components/book/addContent";
import { BookActionsDropdown } from "@/components/book/bookActionsDropdown";
import { EditContent } from "@/components/editContent";
import NavMenu from "@/components/navMenu";
import PageBanner from "@/components/pageBanner";
import { redirect } from "next/navigation";
import React from "react";

async function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { data } = await getContentById(params.id);

  if (!data) redirect("/books");

  const settingsMenu = [
    {
      name: "Content",
      link: `/books/${params.id}`,
      disabled: false,
    },
    {
      name: "Logs",
      link: `/books/${params.id}/logs`,
      disabled: false,
    },
    {
      name: "Usage",
      link: `/books/${params.id}/usage`,
      disabled: false,
    },
  ];

  return (
    <div>
      <PageBanner add={false} title={data.name}>
        <div className='flex items-center gap-2'>
          {data.content ? <BookActionsDropdown data={data} /> : null}
          {!data.content && <AddContent data={data} />}
        </div>
        <div className='absolute bottom-0 left-0 px-2 md:px-36 lg:px-[15rem] flex justify-between items-center w-full'>
          <NavMenu className='gap-2' data={settingsMenu} />
          <EditContent data={data} />
        </div>
      </PageBanner>
      <div className='px-2 md:px-36 lg:px-[15rem] mt-4'>{children}</div>
    </div>
  );
}

export default layout;
