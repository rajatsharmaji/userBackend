import express from "express";
import { getPage, addPage, deletePage, updatePage, listOfPages } from "./page.services.js";

const pageRoutes = express.Router();

pageRoutes.get('/get:uuid', getPage);
pageRoutes.post('/add', addPage);
pageRoutes.delete('/delete', deletePage);
pageRoutes.patch('/update',updatePage);
pageRoutes.get('/list',listOfPages);

export default pageRoutes;
