//express
import express from "express";
const authRouter = express.Router();
//

//contoller
import authController from "../controller/authController.js";
//

authRouter
  .post("/signup", authController.createUser)
  .post("/login", authController.login);

export default authRouter;
