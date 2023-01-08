//jwt
import jwt from "jsonwebtoken";
///

const createToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

export default createToken;
