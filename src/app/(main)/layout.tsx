import Topbar from "@/components/topbar";
import React from "react";
import getSession from "../actions/authActions";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/modeToggle";
import TopNav from "@/components/topNav";

async function MainLayout({ children }: { children: React.ReactNode }) {
  const { session } = await getSession();

  if (!session) redirect("/login");

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.userId),
  });

  if (!user) redirect("/login");

  return (
    <div>
      <Topbar user={user} />
      <TopNav />
      {children}
      <ModeToggle />
    </div>
  );
}

export default MainLayout;
