import express from "express";
const app = express();
import dbConnect from "./database/db.js";
import bodyParser from "body-parser";

app.use(bodyParser.json());

import toDo from "./Routes/toDo.js";
import category from "./Routes/category.js"
app.use("/category", category);
app.use("/task", toDo);
app.listen(3000);