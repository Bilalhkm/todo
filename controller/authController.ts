//mongoose
import User from "../models/user.js";
///

//bcrypt
import bcrypt from "bcrypt";
const saltRounds = 10;
///

//createToken
import createToken from "../utils/createToken.js";
import { Request, Response } from "express";
//

///Sign Up
const createUser = async (req: Request, res: Response) => {
  const existUsername = await User.exists({
    username: req.body.username,
  });
  const existEmail = await User.exists({
    email: req.body.email,
  });
  if (existUsername) {
    res.status(403).send({
      message:
        "User with this username already exists. Please try another username",
    });
  } else if (existEmail) {
    res.status(403).send({
      message: "User with this email already exists. Please try another email",
    });
  } else {
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const signUp = await User.create({ ...req.body, password });
    res.json(
      `Hi ${signUp.username} The process is done successfully.. Your information is: ${signUp}`
    );
  }
};
///

///log in

const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(res.locals.users);
  if (!user) {
    await res.status(404).json({ error: "email is incorrect" });
  } else {
    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!checkPassword) {
      await res.status(403).json({ error: "FORBIDDEN" });
    } else {
      res.send({ verifyUser: user, token: createToken(user._id) });
    }
  }
};
///

export default { createUser, login };
