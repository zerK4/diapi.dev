import { lucia } from "@/app/auth/lucia";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { token: string } },
) {
  const {
    params: { token },
  } = context;

  const [user] = await db.select().from(users).where(eq(users.token, token));
  if (user === undefined) {
    return NextResponse.json({ success: false });
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return NextResponse.json({ success: true });
}
