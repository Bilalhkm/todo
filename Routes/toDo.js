import express from "express";
const toDoRouter = express.Router();
import toDo from "../controller/toDoController.js";
/* import category from "../controller/categoryController.js" */


toDoRouter
    .post('/', toDo.createToDo)
    .get('/', toDo.myTasks)

export default toDoRouter;