"use server";

import { db } from "@/db";
import { ContentType, FullContentType, contents } from "@/db/schema";
import { bookSchema } from "@/schema/bookSchema";
import { z } from "zod";
import getSession from "./authActions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import axios from "axios";
import { clientSync } from "@/lib/axios";

export async function createBook(book: z.infer<typeof bookSchema>): Promise<{
  message: string;
  data: ContentType;
}> {
  const { session } = await getSession();
  if (!session) redirect("/login");
  try {
    const [content] = await db
      .insert(contents)
      .values({
        ...book,
        userId: session.userId,
      })
      .returning();

    await clientSync();

    revalidatePath("/books/");
    return {
      message: "Book created successfully.",
      data: content,
    };
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getAllUserBooks(): Promise<{
  message: string;
  data: ContentType[];
}> {
  const { session } = await getSession();

  if (!session) redirect("/login");
  try {
    const books = await db.query.contents.findMany({
      where: eq(contents.userId, session.userId),
      with: {
        user: true,
        apiKeys: true,
      },
    });

    return {
      message: "Books fetched successfully.",
      data: books,
    };
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getContentById(id: string): Promise<{
  message: string;
  data?: FullContentType;
}> {
  const { session } = await getSession();

  if (!session) redirect("/login");

  try {
    const book = await db.query.contents.findFirst({
      where: and(eq(contents.id, id), eq(contents.userId, session.userId)),
      with: {
        user: true,
        apiKeys: true,
      },
    });

    if (!book) {
      return {
        message: "No book was found.",
        data: undefined,
      };
    }

    return {
      message: "Book fetched successfully.",
      data: book,
    };
  } catch (err) {
    console.log(err);

    throw err;
  }
}

export async function addBookContent({
  content,
  bookId,
}: {
  content: any;
  bookId: string;
}): Promise<{
  message: string;
  data?: ContentType;
}> {
  const { session } = await getSession();

  if (!session) redirect("/login");

  try {
    const [updated] = await db
      .update(contents)
      .set({
        content,
      })
      .where(and(eq(contents.id, bookId), eq(contents.userId, session.userId)))
      .returning();

    revalidatePath(`/books/${bookId}`);

    await clientSync();

    return {
      data: updated,
      message: "Book updated successfully.",
    };
  } catch (err) {
    console.log(err);

    throw err;
  }
}

export async function removeBook(bookId: string) {
  try {
    await db.delete(contents).where(eq(contents.id, bookId));

    await clientSync();

    revalidatePath("/books/");
  } catch (err) {
    console.log(err);

    throw err;
  }
}

export async function updateBookContent({
  content,
  key,
}: {
  content: ContentType["content"];
  key: string;
}) {
  const { session } = await getSession();
  if (!session) redirect("/login");

  try {
    const { data } = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_AE}/${process.env.NEXT_PUBLIC_AEA}/books/${key}`,
      data: {
        clear: true,
        data: content,
      },
    });
    revalidatePath("/books/");

    await clientSync();

    return data;
  } catch (err) {
    console.log(err);

    throw err;
  }
}
