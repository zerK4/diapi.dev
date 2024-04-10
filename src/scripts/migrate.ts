import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "../db";

function main() {
  migrate(db, {
    migrationsFolder: "./drizzle",
  })
    .then((res) => {
      console.log(res, "Migration complete");
    })
    .catch((err) => {
      console.log(err.message, "the error here");
    })
    .finally(() => {
      // client.close();
    });
}

main();
