import express from "express";
const toDoRouter = express.Router();
import category from "../controller/categoryController.js";
import toDo from "../controller/toDoController.js";
import { authintiacateToken } from "../middlewares/authMiddleware.js";
toDoRouter
  //To Do:
  .post("/:categoryID", toDo.createToDo)
  .get("/:categoryID", toDo.listToDos)
  .get("/:categoryID/todoid/:toDoID", toDo.findToDoByID)
  .delete("/:categoryID/todoid/:toDoID", toDo.deleteToDoByID)
  .patch("/:categoryID/todoid/:toDoID", toDo.updateToDoByID);

export default toDoRouter;
