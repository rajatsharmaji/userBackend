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
    const page = await Page.findOne({ name: name });
    if (!page) {
      res.send({ msg: "page does not exist" });
    } else {
      res.send(page);
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
      res.send({ msg: "Page Saved" });
    } else {
      res.send({msg:"name already exists"});
    }
  } catch (err) {
    console.error(err);
  }
};
