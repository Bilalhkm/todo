import toDo from "../controller/toDoController.js";

import categoryRouter from "./category.js";
export default categoryRouter
  //To Do:
  .post("/:categoryID/todo", toDo.createToDo)
  .get("/:categoryID/todo", toDo.listToDos)
  .get("/:categoryID/todo/:toDoID", toDo.findToDoByID)
  .delete("/:categoryID/todo/:toDoID", toDo.deleteToDoByID)
  .patch("/:categoryID/todo/:toDoID", toDo.updateToDoByID);
