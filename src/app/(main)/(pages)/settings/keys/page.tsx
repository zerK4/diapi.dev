import getSession from "@/app/actions/authActions";
import { DataTable } from "@/components/dataTable";
import { db } from "@/db";
import { apiKeys } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import { columns } from "./columns";

async function page() {
  const { session } = await getSession();

  if (!session) redirect("/login");

  const tKeys = await db.query.apiKeys.findMany({
    where: eq(apiKeys.userId, session.userId),
    with: {
      content: true,
    },
  });

  return (
    <div>
      <DataTable columns={columns} data={tKeys} />
    </div>
  );
}

export default page;
