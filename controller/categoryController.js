import mongoose from "mongoose";
import ToDo from "../models/toDo.js";
import Category from "../models/categories.js";
import User from "../models/user.js";

///

const createCategory = async (req, res, next) => {
  try {
    const categoryExist = await Category.exists({
      categoryName: req.body.categoryName,
      user: res.locals.user._id,
    });

    if (!categoryExist) {
      const categoryCreate = await Category.create({
        categoryName: req.body.categoryName,
        user: res.locals.user._id,
      });
      return res.status(201).json({ newCategory: categoryCreate });
    }

    let categoryFind = await Category.find({
      categoryName: req.body.categoryName,
    });

    res.json({
      message: `this category has already been added:`,
      categoryFind,
    });
  } catch (error) {
    console.log(error);
    res.status(424).send({ error: error.message });
  }
};

///

const findCategoryById = async (req, res, next) => {
  const { categoryID } = req.params;
  try {
    const categoryById = await Category.findById({
      _id: categoryID,
      $or: [{ user: res.locals.user._id }, { shareUser: res.locals.user._id }],
    });
    if (categoryById == null) {
      res.status(404).send();
      return;
    }
    res.send({ category: categoryById });
  } catch (error) {
    console.log(error);
    res.status(424).send({ error: error.message });
  }
};

///
const deleteCategoryById = async (req, res, next) => {
  const { categoryID } = req.params;

  try {
    const deleteById = await Category.deleteOne({
      _id: categoryID,
      $or: [{ user: res.locals.user._id }, { shareUser: res.locals.user._id }],
    });
    if (deleteById.deletedCount == 0) {
      res.status(404).send();
    }

    const deleteToDos = await ToDo.deleteMany({
      categoryID,
    });
    if (deleteToDos.deletedCount == 0) {
      res.json({ message: "category is removed", deleteById });
      return;
    } else {
      res.json({
        message: "category and their toDos is removed",
        deleteById,
        deleteToDos,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(424).send({ error: error.message });
  }

  /* const findCategory = (await category.findById({ _id }).select({ category: 1, _id: 0 })).category */
  /* const myCategory = await toDo.find({ category: findCategory }, { task: 1 }); */
};

///

const listCategories = async (req, res, next) => {
  console.log(req.user);

  const { skip, limit } = req.query;
  try {
    const categoryList = await Category.find({
      $or: [{ user: res.locals.user._id }, { shareUser: res.locals.user._id }],
    })
      .skip(skip)
      .limit(limit);
    res.json(categoryList);
  } catch (error) {
    console.log(error);
    res.status(424).send({ error: error.message });
  }
};

///
const shareCategory = async (req, res) => {
  try {
    const { categoryID } = req.params;
    const user = await User.find({ email: req.body.shareWith });
    await Category.updateOne({ _id: categoryID }, { shareUser: user._id });
  } catch (error) {
    console.log(error);
    res.status(424).send({ error: error.message });
  }
};

export default {
  createCategory,
  listCategories,
  findCategoryById,
  deleteCategoryById,
  shareCategory,
};
