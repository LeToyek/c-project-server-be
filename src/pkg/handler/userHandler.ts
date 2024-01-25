import { Response } from "express";
import { CustomRequest } from "../dto/customRequest";
import { UserRepository } from "../repository/userRepository";
import { UserLoginReqModel } from "../dto/userModel";
import { User } from "../repository/db/models/user";
import bcrypt from "bcrypt";
import { generateToken } from "../../middlewares/authentication";

export interface UserHandler {
  login(
    req: CustomRequest<UserLoginReqModel>,
    res: Response
  ): Promise<Response>;
  register(
    req: CustomRequest<UserLoginReqModel>,
    res: Response
  ): Promise<Response>;
  getUserData(
    req: CustomRequest<UserLoginReqModel>,
    res: Response
  ): Promise<Response>;
}

export class UserHandlerImpl implements UserHandler {
  constructor(private userRepository: UserRepository) {}

  public async login(
    req: CustomRequest<UserLoginReqModel>,
    res: Response
  ): Promise<Response> {
    try {
      const { email, password } = req.body;
      const result = await this.userRepository.getUserByEmailandPassword(email);
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: "Not Found",
        });
      }
      const validatedPassword = await bcrypt.compare(password, result.password);

      if (validatedPassword) {
        const token = generateToken(result);
        return res.status(200).json({
          status: 200,
          message: "Login Success",
          data: result,
          token: token,
        });
      }
      return res.json({ status: 404, message: "User Not Found" });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Login Failed " + error,
        error: error,
      });
    }
  }
  async register(
    req: CustomRequest<UserLoginReqModel>,
    res: Response
  ): Promise<Response> {
    try {
      const { email, password } = req.body;
      var hashedPassword = await bcrypt.hash(password, 10);
      const user: User = User.build({
        email: email,
        password: hashedPassword,
      });
      const result = await this.userRepository.createUser(user);
      return res
        .status(200)
        .json({ status: 200, message: "User created", data: result });
    } catch (error) {
      return res.status(500).json({ message: "Register Failed " + error });
    }
  }
  async getUserData(
    req: CustomRequest<UserLoginReqModel>,
    res: Response
  ): Promise<Response> {
    return res.json({ message: "Hello World" });
  }
}
