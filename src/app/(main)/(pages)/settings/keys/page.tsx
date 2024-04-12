import getSession from "@/app/actions/authActions";
import AddKey from "@/components/addKey";
import CopyButton from "@/components/copyButton";
import DisplayDate from "@/components/displayDate";
import RemoveButton from "@/components/removeButton";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Copy, Plus, Trash } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const { session } = await getSession();

  if (!session) redirect("/login");

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.userId),
    with: {
      apiKeys: true,
      contents: {
        with: {
          apiKeys: true,
        },
      },
    },
  });

  return (
    <div>
      <AddKey />
      {user?.contents.map((content) => {
        return content.apiKeys.map((key, i) => (
          <div key={i} className='flex items-center justify-between'>
            <h2 className='text-sm'>{content.name}</h2>
            <span className='max-w-[10rem] whitespace-nowrap overflow-hidden hover:opacity-50 cursor-pointer text-sm'>
              {key.key}
            </span>
            <DisplayDate
              className='text-sm text-zinc-500'
              date={key.createdAt}
            />
            <div className='flex items-center gap-2'>
              <CopyButton copyContent={key.key} className='h-8 w-8'>
                <Copy size={16} />
              </CopyButton>
              <RemoveButton id={key.key} className='h-8 w-8'>
                <Trash size={16} />
              </RemoveButton>
            </div>
          </div>
        ));
      })}
    </div>
  );
}

export default page;
