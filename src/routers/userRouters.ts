import { Express } from "express";
import { UserHandler } from "../pkg/handler/userHandler";
import { auth } from "../middlewares/authentication";

export class UserRouters {
  private userHandler: UserHandler;

  constructor(handler: UserHandler) {
    this.userHandler = handler;
  }

  public registerRouters(path: string, app: Express): void {
    app.post(`${path}/login`, this.userHandler.login);
    app.post(`${path}/register`, this.userHandler.register);
    app.get(`${path}/data`, auth, this.userHandler.getUserData);
  }
}
