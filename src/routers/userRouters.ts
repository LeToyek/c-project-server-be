import { Express } from "express";
import { UserHandler, UserHandlerImpl } from "../pkg/handler/userHandler";
import {
  UserRepository,
  UserRepositoryImpl,
} from "../pkg/repository/userRepository";
import { Sequelize } from "sequelize";

export class UserRouters {

  private userRepository: UserRepository;
  private userHandler: UserHandler;

  constructor(private app: Express, private db: Sequelize) {
    this.userRepository = new UserRepositoryImpl(db);
    this.userRepository.getUserByEmailandPassword("toyek@gmail.com","123456")
    this.userHandler = new UserHandlerImpl(this.userRepository);
  }

  public initRouters(): void {
    this.app.post("/login", this.userHandler.login);
  }
}
