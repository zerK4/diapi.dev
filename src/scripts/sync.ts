import { client } from "../db";

async function main() {
  await client
    .sync()
    .then((res) => {
      console.log(res, "Sync complete");
    })
    .catch((err) => {
      console.log(err, "the error here");
    });
}

main();
