import { createClient } from 'redis';

const client = createClient();
client
  .connect()
  .then(() => {
    console.log("Redis Client is Connected");
  })
  .catch((e) => {
    console.error(e);
  });

export const redisUtil = async (req, res, next) => {
    const uuid = req.params.uuid;
    const pageKey = `page:${uuid}`
    console.log(pageKey);
    const redisData = JSON.parse(await client.get(pageKey));
    if(redisData){
        console.log("Data retrieved from redis");
        res.send(redisData);
    }else{
        next();
    }
};
