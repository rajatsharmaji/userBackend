import { client } from "../redis.client.js";

export const redisUtil = async (req, res, next) => {
  const uuid = req.params.uuid;
  const pageKey = `page:${uuid}`;
  console.log(pageKey);
  const redisData = JSON.parse(await client.get(pageKey));
  if (redisData) {
    console.log("Data retrieved from redis");
    res.send(redisData);
  } else {
    next();
  }
};
