import React from "react";
import LoginClientPage from "./client.page";
import getSession, { logout } from "@/app/actions/authActions";
import { redirect } from "next/navigation";

async function page() {
  const { session } = await getSession();

  if (session) redirect("/");

  return (
    <div className='h-screen w-screen grid place-content-center'>
      <LoginClientPage />
    </div>
  );
}

export default page;
