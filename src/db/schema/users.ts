import { InferSelectModel, relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import { contents } from "./contents";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => v4()),
  name: text("name").notNull(),
  email: text("email").notNull(),
  token: text("token"),
});

export const usersRelations = relations(users, ({ many }) => ({
  contents: many(contents),
}));

export type UserType = InferSelectModel<typeof users>;
