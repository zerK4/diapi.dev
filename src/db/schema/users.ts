import { InferSelectModel, relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import { contents } from "./contents";
import { apiKeys } from "./apiKeys";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => v4()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  token: text("token"),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at"),
});

export const usersRelations = relations(users, ({ many }) => ({
  contents: many(contents),
  apiKeys: many(apiKeys),
}));

export type UserType = InferSelectModel<typeof users>;
