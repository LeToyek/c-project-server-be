import { Response } from "express";
import { CustomRequest } from "../dto/customRequest";
import { UserRepository } from "../repository/userRepository";
import { UserLoginReqModel } from "../dto/userModel";

export interface UserHandler {
  login(
    req: CustomRequest<UserLoginReqModel>,
    res: Response
  ): Promise<Response>;
  register(req: Request, res: Response): void;
  getUserData(req: Request, res: Response): void;
}

export class UserHandlerImpl implements UserHandler {
  constructor(private userRepository: UserRepository) {}

  public async login(
    req: CustomRequest<UserLoginReqModel>,
    res: Response
  ): Promise<Response> {
    try {
      const { email, password } = req.body;
      const result = await this.userRepository.getUserByEmailandPassword(
        email,
        password
      );
      if (result) {
        return res.json({
          status: 200,
          message: "Login Success",
          data: result,
        });
      }
      return res.json({ status: 404, message: "User Not Found" });
    } catch (error) {
      return res.json({
        status: 500,
        message: "Login Failed " + error,
        error: error,
      });
    }
  }
  register(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
  getUserData(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }
}
