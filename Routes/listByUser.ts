import express from "express";
import { allCtegory, allToDo } from "../controller/listByUserContoller";

const listRouter = express.Router();

listRouter.get("/category", allCtegory);
listRouter.get("/todo", allToDo);

export default listRouter;
