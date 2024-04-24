import getSession from "@/app/actions/authActions";
import CopyButton from "@/components/copyButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Copy, Trash } from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";
import React from "react";

async function page() {
  const { user } = await getSession();

  if (!user) redirect("/login");

  const dbUser = await db.query.users.findFirst({
    where: eq(users.id, user.id),
    with: {
      apiKeys: true,
      contents: true,
    },
  });

  if (!dbUser) redirect("/login");

  const totalReads = dbUser.contents.reduce((acc, content) => {
    if (content.reads) {
      return acc + content.reads;
    }

    return 0;
  }, 0);

  const totalWrites = dbUser.contents.reduce((acc, content) => {
    if (content.writes) {
      return acc + content.writes;
    }

    return 0;
  }, 0);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-4'>
        <Image
          src={dbUser.avatar_url ?? "/placeholder-user.jpg"}
          width={80}
          height={80}
          alt={dbUser.name}
          className='rounded-full border border-muted'
        />
        <div className='flex flex-col'>
          <h1 className='text-xl'>{dbUser.name}</h1>
          <p className='text-foreground/50 text-sm'>{dbUser.email}</p>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Card className='p-4 flex items-center gap-2 flex-wrap'>
          <div className='text-sm'>Api keys: {dbUser.apiKeys.length}</div>
          <div className='text-sm'>Books: {dbUser.contents.length}</div>
          <div className='text-sm'>Total reads: {totalReads}</div>
          <div className='text-sm'>Total writes: {totalWrites}</div>
        </Card>
        {dbUser.databaseName && (
          <Card className='p-4'>
            <h3 className='text-xl font-semibold border-b'>Databases</h3>
            <div className='mt-2'>
              <div className='flex items-center gap-2'>
                Name:
                <div>{dbUser.databaseName}</div>
                {dbUser.databaseName && (
                  <CopyButton
                    className='h-8 w-8'
                    copyContent={dbUser.databaseName}
                  >
                    <Copy size={16} />
                  </CopyButton>
                )}
              </div>
              <div className='flex items-center gap-2'>
                Token:{" "}
                <div className='max-w-[10rem] whitespace-nowrap overflow-hidden'>
                  {dbUser.databaseToken}
                </div>
                {dbUser.databaseToken ? (
                  <CopyButton
                    copyContent={dbUser.databaseToken}
                    className='h-8 w-8'
                  >
                    <Copy size={16} />
                  </CopyButton>
                ) : null}
              </div>
            </div>
          </Card>
        )}
        <Card className='p-4 border-[0.1px] border-red-500/50 flex items-center justify-between'>
          <h2>Remove account</h2>
          <Button variant={"destructive"} className='flex items-center gap-2'>
            <Trash size={16} />
            <span>Remove</span>
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default page;
