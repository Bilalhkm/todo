import express from "express";
const app = express();
import dbConnect from "./database/db.js";

import bodyParser from "body-parser";

app.use(bodyParser.json());

import toDo from "./Routes/toDo.js";
app.use('/', toDo);
app.listen(3000);