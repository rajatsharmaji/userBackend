import Page from "./page.model.js";
import { createClient } from "redis";
import { v4 as uniqueId } from "uuid";

const client = createClient();

client
  .connect()
  .then(() => {
    console.log("Redis Connected");
  })
  .catch((e) => {
    console.error(e);
  });

export const getPage = async (req, res) => {
  try {
    const name = req.body.name;
    const redisKey = `page:${name}`;
    const redisData = JSON.parse(await client.get(redisKey));
    if (redisData) {
      console.log("Data retrieved from Redis", redisData);
      res.send(redisData);
    } else {
      const page = await Page.findOne({ name: name });
      if (!page) {
        res.send({ msg: "page does not exist" });
      } else {
        await client.set(redisKey, JSON.stringify(page));
        client.expire(redisKey, 30);
        res.send(page);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const addPage = async (req, res) => {
  try {
    const name = req.body.name;
    const content = req.body.content;
    const userId = req.body.userId;

    const checkExist = await Page.findOne({ name: name });
    if (!checkExist) {
      const newPage = new Page({
        name: name,
        content: content,
        userId: userId,
        uuid: uniqueId(),
      });
      await newPage.save();
      const redisKey = `page:${name}`
      await client.set(redisKey, JSON.stringify(newPage));
      client.expire(redisKey, 30);
      res.send({ msg: "Page Saved" });
    } else {
      res.send({ msg: "name already exists" });
    }
  } catch (err) {
    console.error(err);
  }
};

export const deletePage = async (req,res) =>{
    const name = req.body.name;
    const checkExist = await Page.findOne({name:name});
    if(!checkExist){
        res.send({msg:"page does not exist"})
    }
    else{
       await Page.deleteOne({name:name})
       res.send({msg:"page deleted"})
    }
}

export const updatePage = async (req,res) => {
    const name = req.body.name;
    const content = {content:req.body.content};
    const checkExist = await Page.findOne({name:name});
    if(!checkExist){
        res.send({msg:"page does not exist"})
    }
    else{
       const updatedPage = await Page.findOneAndUpdate({name:name}, content)
       res.send(updatedPage)
    }
}

export const listOfPages = async (req,res) => {
    try{
        const userId = req.body.userId;
        const allPages = await Page.find({userId:userId})
        res.send(allPages)
    }
    catch(err){
        console.error("error: ",err);
    }
}
