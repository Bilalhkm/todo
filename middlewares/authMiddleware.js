import User from "../models/user.js";
import jwt from "jsonwebtoken";

const checkUser = async (req, res, next) => {
  const token =
    req.headers["authoriztion"] && req.headers["authoriztion"].split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.userId);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

///
const authintiacateToken = async (req, res, next) => {
  try {
    const token =
      req.headers["authoriztion"] && req.headers["authoriztion"].split(" ")[1];
    if (!token) {
      res.status(401).json({
        succeeded: false,
        error: "No token available",
      });
    } else {
      req.user = await User.findById(jwt.verify(token, process.env.JWT_SECRET))
        .userId;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: `not autherized ${error.message}` });
  }
};
//
export { authintiacateToken, checkUser };
