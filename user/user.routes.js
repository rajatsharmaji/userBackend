import express from "express";
import { getUser, addUser } from "./user.services.js";

const userRoutes = express.Router();

userRoutes.get("/user", getUser);
userRoutes.post("/user", addUser);

export default userRoutes;
