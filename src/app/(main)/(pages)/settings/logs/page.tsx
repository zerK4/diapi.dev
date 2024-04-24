import getSession from "@/app/actions/authActions";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const { user } = await getSession();

  if (!user) redirect("/login");

  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  if (!dbUser) redirect("/login");

  return <div>logs</div>;
}

export default page;
