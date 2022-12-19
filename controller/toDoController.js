import toDo from "../models/toDo.js";
import category from "../models/categories.js"
const createToDo = async (req, res) => {
    const data = req.body;
    category.exists({ category: req.body.category }, async (err, doc) => {
        if (!doc) {
            res.status(412).json({
                success: false,
                message: 'undifined category',
                data: err
            });


        } else {
            let myTAsk = await toDo.create(req.body);
            res.status(201).json({ myTAsk: myTAsk });
        }
    })




    /* const newToDo = await category.create({})
    res.status(201).json({ newToDo: newToDo }) */
};
const myTasks = async (req, res) => {
    const tasks = await toDo.find({});
    res.send(tasks);

};

export default { createToDo: createToDo, myTasks: myTasks };

