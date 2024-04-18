import axios from "axios";

export async function clientSync() {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_AE}/api/v1/config/sync`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SYNC_TOKEN}`,
        },
      },
    );

    console.log(data, "this is the resp");
    return data;
  } catch (err) {
    console.log(err);

    throw err;
  }
}
