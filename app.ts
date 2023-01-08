////
//$ express
import express from "express";
const app = express();
////

//$ dotenv
import dotenv from "dotenv";
dotenv.config();
////

//$ bodybarser
import bodyParser from "body-parser";
app.use(bodyParser.json());
////

//$ Routs import
// import category from "./Routes/category.js";
import toDo from "./Routes/toDo.js";
import auth from "./Routes/auth.js";
import listByUser from "./Routes/listByUser.js";
// import middleware

import { checkUser } from "./middlewares/authMiddleware";
import category from "./Routes/category";
import { connect } from "./database/db";

////

//$ Routs
app.use("*", checkUser);
app.use("/auth", auth);
app.use("/category", category, toDo);
app.use("/list", listByUser);
////
connect();
app.listen(3000);
