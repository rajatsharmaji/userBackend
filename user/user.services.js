import User from "./user.model.js";
import { createClient } from "redis";
import bcrypt from "bcrypt";
import { v4 as uniqueId } from "uuid";

export const getUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ Email: email });
    if (!user) {
      res.send({ msg: "user does not exist" });
    } else {
      const userPassword = await user.Password;
      if (!bcrypt.compare(password, userPassword)) {
        res.send({ msg: "Incorrect password" });
      } else {
        res.send("Login successfully");
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export const addUser = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    const dob = req.body.dob;

    const checkExist = User.findOne({ Email: email });
    if (!checkExist) {
      const newUser = new User({
        Name: name,
        Email: email,
        Password: password,
        DOB: dob,
        UUID: uniqueId(),
      });
      await newUser.save();
      res.send({ msg: "User Saved" });
    } else {
      res.send("this email is already exist");
    }
  } catch (err) {
    console.error(err);
  }
};
