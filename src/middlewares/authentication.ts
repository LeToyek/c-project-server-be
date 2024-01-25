import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenRequest } from "../pkg/dto/customRequest";
import { User } from "../pkg/repository/db/models/user";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    (req as TokenRequest).user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: "Token invalid" });
  }
};

export const generateToken = (user: User) => {
  return jwt.sign({
    id: user.id,
    email: user.email,
  }, process.env.TOKEN_SECRET as string, {
    expiresIn: "1h",
  });
};
