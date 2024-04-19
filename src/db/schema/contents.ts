import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v4 } from "uuid";
import { UserType, users } from "./users";
import { InferSelectModel, relations } from "drizzle-orm";
import { ApiKeyType, apiKeys } from "./apiKeys";

export const contents = sqliteTable("contents", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => v4()),
  content: text("content", {
    mode: "json",
  }),
  reads: integer("reads").default(0),
  writes: integer("writes").default(0),
  name: text("name").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade",
    }),
  createdAt: integer("created_at").$defaultFn(() => Date.now()),
  updatedAt: integer("updated_at"),
});

export const contentsRelations = relations(contents, ({ one, many }) => ({
  user: one(users, {
    fields: [contents.userId],
    references: [users.id],
  }),
  apiKeys: many(apiKeys),
}));

export type ContentType = InferSelectModel<typeof contents>;
export type FullContentType = ContentType & {
  apiKeys: ApiKeyType[];
  user: UserType;
};
