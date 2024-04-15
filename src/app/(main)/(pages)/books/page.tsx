import getSession from "@/app/actions/authActions";
import { getAllUserBooks } from "@/app/actions/bookActions";
import { DataTable } from "@/components/dataTable";
import PageBanner from "@/components/pageBanner";
import PageSidebar from "@/components/pageSidebar";
import { redirect } from "next/navigation";
import React from "react";
import { columns } from "./columns";
import EmptyPage from "@/components/emptyPage";
import { Card } from "@/components/ui/card";
import { ActionsDropdown } from "@/components/book/actionsDropdown";
import { Link2Icon } from "lucide-react";
import Link from "next/link";

async function page() {
  const { session } = await getSession();

  if (!session) redirect("/login");
  const { data, message } = await getAllUserBooks();

  return (
    <div>
      <PageBanner />
      {!data && <EmptyPage content="Nothing here..." />}
      <div className="px-2 md:px-36 lg:px-[15rem] grid grid-cols-1 mt-2 gap-2">
        <DataTable columns={columns as any} data={data} />
        {/* {data.map((book) => (
          <Card
            key={book.id}
            className='p-2 min-h-20 flex items-center justify-between'
          >
            <Link
              href={`/books/${book.id}`}
              className='flex items-center gap-2'
            >
              <Link2Icon size={16} />
              {book.name}
            </Link>
            <ActionsDropdown book={book} />
          </Card>
        ))} */}
      </div>
    </div>
  );
}

export default page;
