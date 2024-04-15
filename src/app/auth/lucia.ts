import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { db } from "../../db";
import { users } from "../../db/schema";
import { session } from "@/db/schema/session";
import { GitHub } from "arctic";

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
);

const adapter = new DrizzleSQLiteAdapter(db, session, users);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      email: attributes.email,
      id: attributes.id,
      githubId: attributes.github_id,
      username: attributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  id: string;
  github_id: string;
  username: string;
}
