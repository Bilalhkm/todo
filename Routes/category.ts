import express from "express";
const categoryRouter = express.Router();
import category from "../controller/categoryController.js";

categoryRouter
  //Category
  .post("/", category.createCategory)
  .get("/", category.listCategories)
  .get("/:categoryID", category.findCategoryById)
  .delete("/:categoryID", category.deleteCategoryById);

export default categoryRouter;
