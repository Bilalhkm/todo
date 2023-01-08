import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.headers["authoriztion"] &&
    String(req.headers["authoriztion"]).split(" ")[1];
  if (token) {
    interface JwtPayload {
      userId: string;
    }
    const { userId } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user = await User.findById(userId);

    res.locals.user = user;
    next();
  } else {
    res.locals.user = null;
    next();
  }
};

///
export interface GetUser extends Request {
  user: string;
}
export const authintiacateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers["authoriztion"] &&
      String(req.headers["authoriztion"]).split(" ")[1];
    if (!token) {
      res.status(401).json({
        succeeded: false,
        error: "No token available",
      });
    } else {
      interface JwtPayload {
        userId: string;
      }
      const check = await User.findById(
        jwt.verify(token, process.env.JWT_SECRET as string)
      );
      const { userId } = (await User.findById(
        jwt.verify(token, process.env.JWT_SECRET as string)
      )) as JwtPayload;
      (req as any).user = userId;
    }

    next();
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(424).send({ error: error.message });
    } else {
      console.log("Unexpected error", error);
    }
  }
  //
};
