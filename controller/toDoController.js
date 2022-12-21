import toDo from "../models/toDo.js";
import category from "../models/categories.js";

///

const createToDo = async (req, res, next) => {
  const { categoryID } = req.params;

  try {
    const findCategory = await category.find({ _id: categoryID });

    if (findCategory.length == 0) {
      res.status(404).send();
      return;
    }
    const NewToDo = await toDo.create({ categoryID, ...req.body });
    res.json(NewToDo);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

///

const findToDoByID = async (req, res) => {
  const { toDoID, categoryID } = req.params;
  try {
    const toDoById = await toDo.find({ _id: toDoID, categoryID });
    if (toDoById.length == 0) {
      res.status(204).send();
      return;
    }
    res.send({ toDoById });
  } catch (error) {
    res.status(404).send();
  }
};

///

const deleteToDoByID = async (req, res) => {
  const { toDoID, categoryID } = req.params;
  try {
    const deleteById = await toDo.findOneAndRemove({ _id: toDoID, categoryID });
    if (deleteById == null) {
      res.status(404).send();
      return;
    }
  } catch (error) {
    res.status(404).send();
    return;
  }

  res.status(204).json({ message: "categoryis removed" });
};

///

const updateToDoByID = async (req, res) => {
  const { toDoID, categoryID } = req.params;
  try {
    const updateByID = await toDo.findOneAndUpdate(
      { categoryID, _id: toDoID },
      { ...req.body },
      { new: true }
    );
    if (updateByID == null) {
      res.status(204).send();
      return;
    }
    res.status(200).json({ updateByID });
  } catch (error) {
    return res.status(404).send();
  }
};

///

const listToDos = async (req, res) => {
  const { categoryID } = req.params;
  const { skip, limit } = req.query;
  try {
    const ToDoListAll = await toDo.find({ categoryID }).skip(skip).limit(limit);
    if (ToDoListAll.length == 0) {
      return res.status(204).send();
    }
    res.status(200).json({ ToDoListAll });
  } catch (error) {
    return res.status(404).send();
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
