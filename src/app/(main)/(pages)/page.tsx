import { redirect } from "next/navigation";
import getSession from "../../actions/authActions";
import PageBanner from "@/components/pageBanner";

export default async function Home() {
  const { session } = await getSession();

  if (!session) redirect("/login");

  return (
    <div>
      <PageBanner />
    </div>
  );
}
