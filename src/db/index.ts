import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

export const client = createClient({
  // url: process.env.LOCAL_DB as string,
  url: process.env.TURSO_DB_URL!,
  authToken: process.env.TURSO_DB_TOKEN!,
  // syncInterval: 60,
  // encryptionKey: process.env.ENCRYPTION_KEY,
});

export const db = drizzle(client, { schema });
