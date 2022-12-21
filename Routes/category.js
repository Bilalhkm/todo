import express from "express";
const categoryRouter = express.Router();
import category from "../controller/categoryController.js";
import toDo from "../controller/toDoController.js";
categoryRouter
  //Category
  .post("/", category.createCategory)
  .get("/", category.listCategories)
  .get("/:categoryID", category.findCategoryById)
  .delete("/:categoryID", category.deleteCategoryById)

  //To Do:
  .post("/:categoryID/todo", toDo.createToDo)
  .get("/:categoryID/todo", toDo.listToDos)
  .get("/:categoryID/todo/:toDoID", toDo.findToDoByID)
  .delete("/:categoryID/todo/:toDoID", toDo.deleteToDoByID)
  .patch("/:categoryID/todo/:toDoID", toDo.updateToDoByID);

export default categoryRouter;
