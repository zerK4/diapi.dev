import { getContentById } from "@/app/actions/bookActions";
import { AddContent } from "@/components/book/addContent";
import { BookActionsDropdown } from "@/components/book/bookActionsDropdown";
import { EditContent } from "@/components/editContent";
import EmptyPage from "@/components/emptyPage";
import JsonPrettier from "@/components/jsonPrettier";
import PageBanner from "@/components/pageBanner";
import { redirect } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
  const { data } = await getContentById(params.id);

  if (!data) redirect("/books");

  return (
    <div className="">
      <PageBanner add={false} title={data.name}>
        <div className="flex items-center gap-2">
          {data.content ? <BookActionsDropdown data={data} /> : null}
          {!data.content && <AddContent data={data} />}
        </div>
      </PageBanner>
      <div className="mx-2 md:mx-36 lg:mx-[15rem] max-h-[70vh] overflow-auto">
        {!data.content ? (
          <div className="w-full grid place-content-center h-[25vh]">
            <EmptyPage content="Nothing here..." />
          </div>
        ) : (
          <div className="relative">
            <EditContent data={data} />
            <JsonPrettier data={data.content} />
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
