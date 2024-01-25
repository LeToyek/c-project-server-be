import { Express } from "express";
import { UserHandler, UserHandlerImpl } from "../pkg/handler/userHandler";
import {
  UserRepository,
  UserRepositoryImpl,
} from "../pkg/repository/userRepository";
import { Sequelize } from "sequelize";

export class UserRouters {
  constructor(private userHandler: UserHandler) {
  }

  public registerRouters(app: Express) {
    app.post("/users/login", this.userHandler.login);
  }
}
