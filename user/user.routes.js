import express from "express";
import { getUser, addUser } from "./user.services.js";

const userRoutes = express.Router();

userRoutes.get("/login", getUser);
userRoutes.post("/add", addUser);

export default userRoutes;
