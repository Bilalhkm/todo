import mongoose from "mongoose";
import toDo from "../models/toDo.js"
import category from "../models/categories.js";
const createCategory = (req, res) => {

    category.exists({ category: req.body.category }, async (err, doc) => {
        if (!doc) {
            const newCategory = await category.create(req.body);
            res.status(201).json({ newCategory: newCategory });


        } else {
            let myCategory = await category.find({ category: req.body.category });
            res.json({ myCategory: myCategory });
        }
    })

};
const oneCategory = async (req, res) => {

    const _id = req.params.id
    const findCategory = (await category.findById({ _id }).select({ category: 1, _id: 0 })).category


    const myCategory = await toDo.find({ category: findCategory }, { task: 1 });
    res.send({ category: findCategory, tasks: myCategory });

}
const listCategories = async (req, res) => {
    const myCategory = req.query.category
    console.log(req.query.category);
    if (myCategory) { res.json(await toDo.find({ category: myCategory })); } else {
        const myCategories = await category.find({});
        res.json(myCategories)
    };


}

export default { createCategory: createCategory, listCategories: listCategories, oneCategory: oneCategory };

