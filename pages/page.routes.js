import express from "express";
import { getPage, addPage, deletePage, updatePage, listOfPages } from "./page.services.js";

const pageRoutes = express.Router();

pageRoutes.get("/page", getPage);
pageRoutes.post("/page", addPage);
pageRoutes.delete("/page", deletePage);
pageRoutes.patch("/page",updatePage)
pageRoutes.get("",listOfPages)

export default pageRoutes;
