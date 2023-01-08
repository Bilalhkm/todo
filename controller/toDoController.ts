import toDo from "../models/toDo";
import Category from "../models/categories";
import { NextFunction, Request, Response } from "express";

///

const createToDo = async (req: Request, res: Response, next: NextFunction) => {
  const { categoryID } = req.params;

  try {
    const findCategory = await Category.find({
      _id: categoryID,
      user: res.locals.user._id,
    });
    console.log(findCategory);

    if (findCategory.length == 0) {
      res.status(404).send();
      return;
    }

    const NewToDo = await toDo.create({
      ...req.body,
      categoryID: categoryID,
      createdDate: new Date(),
      user: res.locals.user._id,
    });
    res.json(NewToDo);
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

const findToDoByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { toDoID, categoryID } = req.params;
  try {
    const checkUser = await Category.exists({
      categoryID,
      user: res.locals.user._id,
    });

    if (!checkUser) {
      res.status(404).send();
    } else {
      const toDoById = await toDo.find({
        _id: toDoID,
        categoryID,
        user: res.locals.user._id,
      });
      if (toDoById.length == 0) {
        res.status(204).send();
        return;
      }
      res.send({ toDoById });
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

const deleteToDoByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { toDoID, categoryID } = req.params;
  try {
    const checkUser = await Category.exists({
      categoryID,
      $or: [{ user: res.locals.user._id }, { shareUser: res.locals.user._id }],
    });

    if (!checkUser) {
      res.status(404).send();
    } else {
      const deleteById = await toDo.deleteOne({ _id: toDoID, categoryID });
      if (deleteById.deletedCount == 0) {
        res.status(404).send();
      } else {
        res.json({ deleteById });
      }
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

const updateToDoByID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idCat = req.params.categoryID;
  const { toDoID } = req.params;
  const { categoryID, ...other } = req.body;
  try {
    const checkUser = await Category.exists({
      categoryID,
      $or: [{ user: res.locals.user._id }, { shareUser: res.locals.user._id }],
    });

    if (!checkUser) {
      res.status(404).send();
    }
    const updateByID = await toDo.findOneAndUpdate(
      { categoryID: idCat, _id: toDoID },
      { ...other },
      { new: true }
    );
    if (updateByID == null) {
      res.status(204).send();
      return;
    }
    res.status(200).json({ updateByID });
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

const listToDos = async (req: Request, res: Response, next: NextFunction) => {
  const { categoryID } = req.params;

  const { skip, limit, startdate, finishdate, completetask } = req.query;
  let _skip: number = 0,
    _limit: number = 0;
  if (skip) {
    _skip = Number(skip);
  }
  if (limit) {
    _limit = Number(limit);
  }
  let duoDate;
  if (startdate && finishdate) {
    duoDate = {
      $gte: new Date(String(startdate)),
      $lte: new Date(String(finishdate)),
    };
  } else if (startdate) {
    duoDate = { $gte: new Date(String(startdate)) };
  } else if (finishdate) {
    duoDate = { $lte: new Date(String(finishdate)) };
  }

  try {
    const checkUser = await Category.find({
      _id: categoryID,
      user: res.locals.user._id,
    });
    console.log(checkUser);
    if (checkUser.length == 0) {
      res.status(404).send();
    } else {
      let ToDoListAll;
      if (duoDate) {
        ToDoListAll = await toDo
          .find({
            categoryID,
            duoDate,
          })
          .skip(Number(_skip))
          .limit(Number(_limit));
      } else {
        ToDoListAll = await toDo
          .find({
            categoryID,
          })
          .skip(Number(_skip))
          .limit(Number(_limit));
      }
      if (ToDoListAll.length == 0) {
        return res.status(204).send();
      }
      res.status(200).json({ ToDoListAll });
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
  createToDo,
  listToDos,
  findToDoByID,
  deleteToDoByID,
  updateToDoByID,
};
