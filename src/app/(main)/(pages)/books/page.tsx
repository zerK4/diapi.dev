import getSession from "@/app/actions/authActions";
import { getAllUserBooks } from "@/app/actions/bookActions";
import { DataTable } from "@/components/dataTable";
import PageBanner from "@/components/pageBanner";
import PageSidebar from "@/components/pageSidebar";
import { redirect } from "next/navigation";
import React from "react";
import { columns } from "./columns";
import EmptyPage from "@/components/emptyPage";

async function page() {
  const { session } = await getSession();

  if (!session) redirect("/login");
  const { data, message } = await getAllUserBooks();

  return (
    <div>
      <PageBanner />
      {!data && <EmptyPage content='Nothing here...' />}
      <div className='px-2 md:px-36 lg:px-[15rem] grid grid-cols-1 mt-2'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default page;
