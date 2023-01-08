import { Request, Response } from "express";
import Category from "../models/categories";
import ToDo from "../models/toDo";

export const allCtegory = async (req: Request, res: Response) => {
  try {
    const listCategory = await Category.find({
      user: res.locals.user._id,
    });
    if (listCategory.length == 0) {
      res.status(204).send();
    } else {
      res.json(listCategory);
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
export const allToDo = async (req: Request, res: Response) => {
  try {
    const listToDo = await ToDo.find({
      user: res.locals.user._id,
    });
    if (listToDo.length == 0) {
      res.status(204).send();
    } else {
      res.json(listToDo);
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
