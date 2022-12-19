import category from "../models/categories.js";
const createCategory = async (req, res) => {
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
const listCategories = async (req, res) => {
    const myCategories = await category.find({});
    res.json(myCategories)
}

export default { createCategory: createCategory, listCategories: listCategories };

