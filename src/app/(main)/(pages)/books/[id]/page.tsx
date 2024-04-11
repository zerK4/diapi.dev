import { getBookById } from "@/app/actions/bookActions";
import { AddContent } from "@/components/book/addContent";
import { BookActionsDropdown } from "@/components/book/bookActionsDropdown";
import EmptyPage from "@/components/emptyPage";
import JsonPrettier from "@/components/jsonPrettier";
import PageBanner from "@/components/pageBanner";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

async function page({ params }: { params: { id: string } }) {
  const { message, data } = await getBookById(params.id);

  if (!data) redirect("/books");

  return (
    <div className=''>
      <PageBanner add={false} title={data.name}>
        <div className='flex items-center gap-2'>
          <BookActionsDropdown data={data} />
          {!data.content && <AddContent data={data} />}
        </div>
      </PageBanner>
      <div className='mx-2 md:mx-36 lg:mx-[15rem] max-h-[70vh] overflow-auto'>
        {!data.content ? (
          <div className='w-full grid place-content-center h-[25vh]'>
            <EmptyPage content='Nothing here...' />
          </div>
        ) : (
          <div className='relative'>
            <Button className='sticky top-2' size={"icon"}>
              <Pen size={16} />
            </Button>
            <JsonPrettier data={data.content} />
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
