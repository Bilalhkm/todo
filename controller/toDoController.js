import toDo from "../models/toDo.js";
import category from "../models/categories.js";

///

const createToDo = async (req, res) => {
  const categoryID = req.params.id;
  const findCategory = await category.findById(categoryID).exec(function (err) {
    if (err) {
      const errors = "User not found";
      res.status(404).json({ errors });
      // stop further execution in this callback
      return;
    }
  });
  /* if (!findCategory) {
    return res.status(404).send();
  } */

  const NewToDo = await toDo.create({ categoryID, ...req.body });
  res.json(NewToDo);
};

///

const findToDoByID = async (req, res) => {
  const ToDoID = req.params.id;
  const url = req.url;
  const string = url.split("/");
  const categoryID = string[1];
  const ToDoById = await toDo.find({ _id: ToDoID, categoryID });
  res.send({ ToDoById });
};

///

const DeleteToDoByID = async (req, res) => {
  const ToDoID = req.params.id;
  const url = req.url;
  const string = url.split("/");
  const categoryID = string[1];
  const DeleteByID = await toDo.findOneAndRemove({ _id: ToDoID, categoryID });
  res.status(204).json({ message: "categoryis removed" });
};

///

const updateToDoByID = async (req, res) => {
  const ToDoID = req.params.id;
  const url = req.url;
  const string = url.split("/");
  const categoryID = string[1];
  const updateByID = await toDo.findOneAndUpdate(
    { categoryID, _id: ToDoID },
    { ...req.body },
    { new: true }
  );
  res.status(200).json({ updateByID });
};

///

const listToDos = async (req, res) => {
  const categoryID = req.params.id;
  const { skip, limit } = req.query;
  const ToDoListAll = await toDo.find({ categoryID }).skip(skip).limit(limit);
  if (!ToDoListAll) {
    return res.status(404).send();
  }

  res.status(200).json({ ToDoListAll });
};

export default {
  createToDo,
  listToDos,
  findToDoByID,
  DeleteToDoByID,
  updateToDoByID,
};
