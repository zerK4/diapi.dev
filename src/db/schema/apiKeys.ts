import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import { contents } from "./contents";
import { relations } from "drizzle-orm";
import { users } from "./users";

export const apiKeys = sqliteTable("api_keys", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => v4()),
  key: text("key").notNull(),
  contentId: text("content_id")
    .notNull()
    .references(() => contents.id, {
      onDelete: "cascade",
    }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  createdAt: integer("created_at")
    .notNull()
    .$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at"),
});

export const apiKeysRelations = relations(apiKeys, ({ one }) => ({
  content: one(contents, {
    fields: [apiKeys.contentId],
    references: [contents.id],
    relationName: "content_relation",
  }),
  user: one(users, {
    fields: [apiKeys.userId],
    references: [users.id],
    relationName: "user_relation",
  }),
}));
