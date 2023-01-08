import mongoose from "mongoose";
import ToDo from "../models/toDo";
import Category from "../models/categories";
import User from "../models/user.js";
import { NextFunction, Request, Response } from "express";

///

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    if (error instanceof Error) {
      console.log(error);
      res.status(424).send({ error: error.message });
    } else {
      console.log("Unexpected error", error);
    }
  }
};

///

const findCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryID } = req.params;
  console.log(categoryID);

  try {
    const categoryById = await Category.find({
      _id: categoryID,
      user: res.locals.user._id,
    });
    if (categoryById == null) {
      res.status(404).send();
      return;
    }
    res.send({ category: categoryById });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(424).send({ error: error.message });
    } else {
      console.log("Unexpected error", error);
    }
  }
};

///
const deleteCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryID } = req.params;

  try {
    const deleteById = await Category.deleteOne({
      _id: categoryID,
      user: res.locals.user._id,
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
    if (error instanceof Error) {
      console.log(error);
      res.status(424).send({ error: error.message });
    } else {
      console.log("Unexpected error", error);
    }
  }

  /* const findCategory = (await category.findById({ _id }).select({ category: 1, _id: 0 })).category */
  /* const myCategory = await toDo.find({ category: findCategory }, { task: 1 }); */
};

///

const listCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  interface Query {
    skip: string;
    limit: string;
  }

  const parameters: Query = {
    skip: req.query.skip as string,
    limit: req.query.limit as string,
  };
  let _skip: number = 0,
    _limit: number = 0;
  if (parameters.skip) {
    _skip = Number(parameters.skip);
  }
  if (parameters.limit) {
    _limit = Number(parameters.limit);
  }

  try {
    const categoryList = await Category.find({
      user: res.locals.user._id,
    })
      .skip(_skip)
      .limit(_limit);
    if (categoryList.length == 0) {
      res.status(204).send();
    } else {
      res.json(categoryList);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(424).send({ error: error.message });
    } else {
      console.log("Unexpected error", error);
    }
  }
};

///

export default {
  createCategory,
  listCategories,
  findCategoryById,
  deleteCategoryById,
};
