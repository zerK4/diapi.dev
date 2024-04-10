import { redirect } from "next/navigation";
import getSession from "../actions/authActions";

export default async function Home() {
  const { session } = await getSession();

  if (!session) redirect("/login");

  return <div>asd</div>;
}
