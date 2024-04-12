"use server";

import { redirect } from "next/navigation";
import getSession from "./authActions";
import { db } from "../../db";
import { apiKeys } from "../../db/schema";
import { generate } from "short-uuid";
import { v4 } from "uuid";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";

export async function createApiKey(bookId: string, name: string) {
  const { session } = await getSession();

  if (!session) redirect("/login");

  try {
    const key = await db.insert(apiKeys).values({
      name,
      contentId: bookId,
      userId: session.userId,
      key: `diapi-${v4()}-${generate()}`,
    });

    revalidatePath(`/books/${bookId}`);
    return {
      message: "API key successfully created.",
      data: key,
    };
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function deleteApiKey(keyId: string) {
  const { session } = await getSession();

  if (!session) redirect("/login");
  try {
    await db
      .delete(apiKeys)
      .where(and(eq(apiKeys.key, keyId), eq(apiKeys.userId, session.userId)));

    revalidatePath(`/books/`);
    revalidatePath(`/settings`);
  } catch (error) {
    console.log(error);

    throw error;
  }
}
