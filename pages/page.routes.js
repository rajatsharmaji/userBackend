import express from "express";
import {
  getPage,
  addPage,
  deletePage,
  updatePage,
  listOfPages,
} from "./page.services.js";
import { redisUtil } from "../middleware/redis.util.js";
import { verifyToken } from "../middleware/auth.js";

const pageRoutes = express.Router();

pageRoutes.get("/:uuid", redisUtil, getPage);
pageRoutes.post("/", addPage);
pageRoutes.delete("/:uuid", deletePage);
pageRoutes.patch("/:uuid", updatePage);
pageRoutes.get("/", listOfPages);

export default pageRoutes;
