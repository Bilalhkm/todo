//$ express
import express from "express";
const app = express();
////

//$ dotenv
import dotenv from "dotenv";
dotenv.config();
////

//$ database
import dbConnect from "./database/db.js";
////

//$ bodybarser
import bodyParser from "body-parser";
app.use(bodyParser.json());
////

//$ Routs import
import category from "./Routes/category.js";
import toDo from "./Routes/toDo.js";
import auth from "./Routes/auth.js";
// import middleware
import { checkUser } from "./middlewares/authMiddleware.js";
////

//$ Routs
app.use("*", checkUser);
app.use("/category", category);
app.use("/todo", toDo);
app.use("/auth", auth);
////

app.listen(3000);
