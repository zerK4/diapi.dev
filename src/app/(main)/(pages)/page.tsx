import { redirect } from "next/navigation";
import getSession from "../../actions/authActions";
import PageBanner from "@/components/pageBanner";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { SharedCard } from "@/components/sharedCard";

export default async function Home() {
  const { session } = await getSession();

  if (!session) redirect("/login");

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.userId),
    with: {
      contents: {
        with: {
          apiKeys: true,
        },
      },
      apiKeys: true,
    },
  });

  return (
    <>
      <PageBanner add={false} title='Hi there'>
        <div className='text-sm flex items-center gap-2'>
          <Link href='/books' className=''>
            <span>Contents: {user?.contents.length}</span>
          </Link>
          <Separator orientation='vertical' className='h-6 rotate-[20deg]' />
          <Link href='/settings/keys'>
            <span>Keys: {user?.apiKeys.length}</span>
          </Link>
        </div>
      </PageBanner>
      <div className='p-2 md:px-36 lg:px-[15rem] flex flex-wrap gap-2'>
        {user?.contents.map((content, i) => (
          <SharedCard key={i} data={content} />
        ))}
      </div>
    </>
  );
}
