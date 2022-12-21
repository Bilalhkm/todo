import mongoose from "mongoose";
import toDo from "../models/toDo.js";
import category from "../models/categories.js";

///

const createCategory = async (req, res) => {
  const categoryExist = await category.exists({
    categoryName: req.body.categoryName,
  });

  if (!categoryExist) {
    const categoryCreate = await category.create(req.body);
    return res.status(201).json({ newCategory: categoryCreate });
  }

  let categoryFind = await category.find({
    categoryName: req.body.categoryName,
  });

  res.json({
    message: `this category has already been added:`,
    categoryFind,
  });
};

///

const findCategoryById = async (req, res) => {
  const { categoryID } = req.params;
  try {
    const categoryById = await category.findById({ _id: categoryID });
    if (categoryById == null) {
      res.status(404).send();
      return;
    }
    res.send({ category: categoryById });
  } catch (error) {
    res.status(404).send();
    return;
  }
};

///
const deleteCategoryById = async (req, res) => {
  const { categoryID } = req.params;

  try {
    const deleteById = await category.findByIdAndRemove({ _id: categoryID });
    if (deleteById == null) {
      res.status(404).send();
      return;
    }
    const deleteToDos = await toDo.findOneAndRemove({ categoryID });
    if (deleteToDos == null) {
      res.status(404).send();
      return;
    }
    res.status(204).json({ message: "category is removed" });
  } catch (error) {
    res.status(404).send();
    return;
  }

  /* const findCategory = (await category.findById({ _id }).select({ category: 1, _id: 0 })).category */
  /* const myCategory = await toDo.find({ category: findCategory }, { task: 1 }); */
};

///

const listCategories = async (req, res) => {
  const { skip, limit } = req.query;
  try {
    const categoryList = await category.find({}).skip(skip).limit(limit);
    res.json(categoryList);
  } catch (error) {
    res.status(404).send();
  }
};

///

export default {
  createCategory,
  listCategories,
  findCategoryById,
  deleteCategoryById,
};
