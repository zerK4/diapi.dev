// app/login/github/callback/route.ts
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { github, lucia } from "@/app/auth/lucia";
import { db } from "@/db";
import { eq, or } from "drizzle-orm";
import { users } from "@/db/schema";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    const emailResponse = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const emails = await emailResponse.json();

    const primaryEmail = emails.find(
      (email: {
        email: string;
        primary: boolean;
        verified: boolean;
        visibility: string;
      }) => email.primary
    );

    console.log(emails, githubUser, primaryEmail, "here user");

    // Replace this with your own DB client.
    const existingUser = await db.query.users.findFirst({
      where: or(
        eq(users.github_id, githubUser.id),
        eq(users.email, primaryEmail.email)
      ),
    });

    if (existingUser) {
      console.log(existingUser, "existing user");
      Object.keys(existingUser).forEach(async (key) => {
        if (
          existingUser[key as keyof typeof existingUser] === null &&
          key !== "created_at" &&
          key !== "updated_at"
        ) {
          console.log(key, githubUser[key as keyof GitHubUser], "here");
          try {
            if (key === "github_id") {
              await db.update(users).set({
                [key as keyof typeof existingUser]: githubUser.id,
              });
            } else if (key === "username") {
              await db.update(users).set({
                [key as keyof typeof existingUser]: githubUser.login,
              });
            } else {
              await db.update(users).set({
                [key]: githubUser[key as keyof GitHubUser],
              });
            }
          } catch (err) {
            console.log(err, "error");
          }
        }
      });

      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    // Replace this with your own DB client.
    const [newUser] = await db
      .insert(users)
      .values({
        name: githubUser.name,
        avatar_url: githubUser.avatar_url,
        github_id: githubUser.id,
        username: githubUser.login,
        email: githubUser.email,
      })
      .returning();

    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface GitHubUser {
  id: string;
  login: string;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}
