import User from "./user.model.js";
import bcrypt from "bcrypt";
import { v4 as uniqueId } from "uuid";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export const getUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.send({ msg: "user does not exist" });
    } else {
      const userPassword = await user.password;
      const checkPassword = await bcrypt.compare(password, userPassword);
      if (!checkPassword) {
        res.send({ msg: "Incorrect password" });
      } else {
        const token = jwt.sign(user.uuid, SECRET_KEY);
        res.send({ user, token });
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
    const tempPassword = req.body.password;
    const password = await bcrypt.hash(tempPassword, 10);
    const dob = req.body.dob;
    const checkExist = await User.findOne({ email: email }); //.populate({password:-1})
    if (!checkExist) {
      const newUser = new User({
        name: name,
        email: email,
        password: password,
        dob: dob,
        uuid: uniqueId(),
      });
      await newUser.save();
      delete newUser.password;
      res.send(userRes);
    } else {
      res.send({ msg: "this email is already exist" });
    }
  } catch (err) {
    console.error(err);
  }
};
