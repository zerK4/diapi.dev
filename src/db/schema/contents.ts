import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import { users } from "./users";
import { InferSelectModel, relations } from "drizzle-orm";

export const contents = sqliteTable("contents", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => v4()),
  content: text("content", {
    mode: "json",
  }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
});

export const contentsRelations = relations(contents, ({ one }) => ({
  user: one(users, {
    fields: [contents.userId],
    references: [users.id],
  }),
}));

export type ContentType = InferSelectModel<typeof contents>;
