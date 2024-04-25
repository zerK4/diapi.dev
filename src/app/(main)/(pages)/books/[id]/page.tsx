import { getContentById } from "@/app/actions/bookActions";
import { EditContent } from "@/components/editContent";
import EmptyPage from "@/components/emptyPage";
import JsonPrettier from "@/components/jsonPrettier";
import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";

async function page({ params }: { params: { id: string } }) {
  const { data } = await getContentById(params.id);

  if (!data) redirect("/books");

  return (
    <div className=''>
      {!data.content ? (
        <div className='w-full grid place-content-center h-[25vh]'>
          <EmptyPage content='Nothing here...' />
        </div>
      ) : (
        <Card className='relative p-2 my-2 max-h-[70vh] overflow-auto'>
          <JsonPrettier data={data.content} />
        </Card>
      )}
    </div>
  );
}

export default page;
