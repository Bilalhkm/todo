import express from "express";
const categoryRouter = express.Router();
import category from "../controller/categoryController.js";

categoryRouter

    .post("/", category.createCategory)
    .get("/", category.listCategories)
    .get(["/:id", "/index.html"], category.oneCategory);

export default categoryRouter;