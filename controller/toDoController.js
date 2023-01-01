import toDo from "../models/toDo.js";
import Category from "../models/categories.js";

///

const createToDo = async (req, res, next) => {
  const { categoryID } = req.params;

  try {
    const findCategory = await Category.find({
      _id: categoryID,
      $or: [{ user: res.locals.user._id }, { shareUser: res.locals.user._id }],
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
    });
    res.json(NewToDo);
  } catch (error) {
    console.log(error);
    res.status(424).send({ error: error.message });
  }
};

///

const findToDoByID = async (req, res, next) => {
  const { toDoID, categoryID } = req.params;
  try {
    const checkUser = await Category.exists({
      categoryID,
      $or: [{ user: res.locals.user._id }, { shareUser: res.locals.user._id }],
    });

    if (!checkUser) {
      res.status(404).send();
    } else {
      const toDoById = await toDo.find({ _id: toDoID, categoryID });
      if (toDoById.length == 0) {
        res.status(204).send();
        return;
      }
      res.send({ toDoById });
    }
  } catch (error) {
    console.log(error);
    res.status(424).send({ error: error.message });
  }
};

///

const deleteToDoByID = async (req, res, next) => {
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
    console.log(error);
    res.status(424).send({ error: error.message });
  }
};

///

const updateToDoByID = async (req, res, next) => {
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
    console.log(error);
    res.status(424).send({ error: error.message });
  }
};

///

const listToDos = async (req, res, next) => {
  const { categoryID } = req.params;

  const { skip, limit, startdate, finishdate, completetask } = req.query;
  let duoDate;
  if (startdate && finishdate) {
    duoDate = { $gte: new Date(startdate), $lte: new Date(finishdate) };
  } else if (startdate) {
    duoDate = { $gte: new Date(startdate) };
  } else if (finishdate) {
    duoDate = { $lte: new Date(finishdate) };
  }

  try {
    const checkUser = await Category.exists({
      categoryID,
      $or: [{ user: res.locals.user._id }, { shareUser: res.locals.user._id }],
    });
    console.log(checkUser);
    if (!checkUser) {
      res.status(404).send();
    } else {
      let ToDoListAll;
      if (duoDate) {
        ToDoListAll = await toDo
          .find({
            categoryID,
            duoDate,
          })
          .skip(skip)
          .limit(limit);
      } else {
        ToDoListAll = await toDo
          .find({
            categoryID,
          })
          .skip(skip)
          .limit(limit);
      }
      if (ToDoListAll.length == 0 || checkUser == false) {
        return res.status(204).send();
      }
      res.status(200).json({ ToDoListAll });
    }
  } catch (error) {
    console.log(error);
    res.status(424).send({ error: error.message });
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
