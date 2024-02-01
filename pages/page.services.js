import Page from "./page.model.js";
import { client } from "../redis.client.js";
import { v4 as uniqueId } from "uuid";

export const getPage = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const redisKey = `page:${uuid}`;
    const page = await Page.findOne({ uuid: uuid }).select({ _id: 0, __v: 0 });
    if (!page) {
      res.send({ msg: "page does not exist" });
    } else {
      await client.set(redisKey, JSON.stringify(page));
      client.expire(redisKey, 30);
      res.send(page);
    }
  } catch (e) {
    console.error(e);
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
      const redisKey = `page:${name}`;
      await client.set(redisKey, JSON.stringify(newPage));
      client.expire(redisKey, 30);
      res.send(newPage);
    } else {
      res.send({ msg: "name already exists" });
    }
  } catch (err) {
    console.error(err);
  }
};

export const deletePage = async (req, res) => {
  console.log("req: ", req);
  const uuid = req.params.uuid;
  try {
    const checkExist = await Page.findOne({ uuid: uuid });
    if (!checkExist) {
      res.send({ msg: "page does not exist" });
    } else {
      await Page.deleteOne({ uuid: uuid });
      res.send({ msg: "page deleted" });
    }
  } catch (err) {
    console.error("error: ", err);
  }
};

export const updatePage = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const redisKey = `page:${uuid}`;
    const content = { content: req.body.content };
    const checkExist = await Page.findOne({ uuid: uuid });
    if (!checkExist) {
      res.send({ msg: "page does not exist" });
    } else {
      const updatedPage = await Page.findOneAndUpdate({ uuid: uuid }, content);
      console.log("redisKey:", redisKey, "updatePage:", updatedPage);
      await client.set(redisKey, JSON.stringify(updatedPage));
      client.expire(redisKey, 30);
      res.send(updatedPage);
    }
  } catch (err) {
    console.log(err);
  }
};

export const listOfPages = async (req, res) => {
  try {
    const userId = req.body.userId;
    const allPages = await Page.find({ userId: userId });
    res.send(allPages);
  } catch (err) {
    console.error("error: ", err);
  }
};
