import express from "express";
import { getPage, addPage } from "./page.services.js";

const pageRoutes = express.Router();

pageRoutes.get("/page", getPage);
pageRoutes.post("/page", addPage);

export default pageRoutes;
