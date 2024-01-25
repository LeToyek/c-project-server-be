import { Express } from "express";
import { UserHandler } from "../pkg/handler/userHandler";

export class UserRouters {
  private userHandler: UserHandler;

  constructor(handler: UserHandler) {
    this.userHandler = handler;
  }

  public registerRouters(path: string, app: Express): void {
    app.post(`${path}/login`, this.userHandler.login);
  }
}
