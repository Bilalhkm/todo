import express from "express";
const categoryRouter = express.Router();
import category from "../controller/categoryController.js";
import toDo from "../controller/toDoController.js";
categoryRouter
  //Category
  .post("/", category.createCategory)
  .get("/", category.listCategories)
  .get("/:id", category.findCategoryById)
  .delete("/:id", category.DeleteCategoryById)

  //To Do:
  .post("/:id/todo", toDo.createToDo)
  .get("/:id/todo", toDo.listToDos)
  .get("/:id/todo/:id", toDo.findToDoByID)
  .delete("/:id/todo/:id", toDo.DeleteToDoByID)
  .patch("/:id/todo/:id", toDo.updateToDoByID);

export default categoryRouter;
