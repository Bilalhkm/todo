import mongoose from "mongoose";
import toDo from "../models/toDo.js";
import category from "../models/categories.js";

///

const createCategory = async (req, res) => {
  const categoryExist = await category.exists({
    categoryName: req.body.category,
  });

  if (!categoryExist) {
    const categoryCreate = await category.create(req.body);
    return res.status(201).json({ newCategory: categoryCreate });
  }

  let categoryFind = await category.find({
    categoryName: req.body.category,
  });

  res.json({ Category: categoryFind });
};

///

const findCategoryById = async (req, res) => {
  const _id = req.params.id;
  const categoryById = await category.findById({ _id });
  res.send({ category: categoryById });

  /* const findCategory = (await category.findById({ _id }).select({ category: 1, _id: 0 })).category */
  /* const myCategory = await toDo.find({ category: findCategory }, { task: 1 }); */
};

///
const DeleteCategoryById = async (req, res) => {
  const _id = req.params.id;
  const deleteById = await category.findByIdAndRemove({ _id });
  const deleteToDos = await toDo.findOneAndRemove({ categoryID: _id });
  res.status(204).json({ message: "category is removed" });

  /* const findCategory = (await category.findById({ _id }).select({ category: 1, _id: 0 })).category */
  /* const myCategory = await toDo.find({ category: findCategory }, { task: 1 }); */
};

///

const listCategories = async (req, res) => {
  const { skip, limit } = req.query;
  const categoryList = await category.find({}).skip(skip).limit(limit);
  res.json(categoryList);
};

///

export default {
  createCategory: createCategory,
  listCategories: listCategories,
  findCategoryById: findCategoryById,
  DeleteCategoryById: DeleteCategoryById,
};
