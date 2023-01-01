import express from "express";
const categoryRouter = express.Router();
import category from "../controller/categoryController.js";
import toDo from "../controller/toDoController.js";
import { authintiacateToken } from "../middlewares/authMiddleware.js";
categoryRouter
  //Category
  .post("/", category.createCategory)
  .get("/", authintiacateToken, category.listCategories)
  .get("/:categoryID", category.findCategoryById)
  .delete("/:categoryID", category.deleteCategoryById)
  .patch("/:categoryID/sharewith/:sharewithid", category.shareCategory);

export default categoryRouter;
