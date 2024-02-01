import { createClient } from "redis";

export const client = createClient()
  client.connect()
  .then(() => {
    console.log("Redis Client is Connected");
  })
  .catch((e) => {
    console.error(e);
  });