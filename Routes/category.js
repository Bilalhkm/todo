import express from "express";
const categoryRouter = express.Router();
import category from "../controller/categoryController.js";

categoryRouter
    .post("/", category.createCategory)
    .get("/", category.listCategories);

export default categoryRouter;