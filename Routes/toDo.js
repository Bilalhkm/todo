import express from "express";
const toDoRouter = express.Router();
import toDo from "../controller/toDoController.js";

toDoRouter.post('/', toDo.createToDo);
export default toDoRouter;