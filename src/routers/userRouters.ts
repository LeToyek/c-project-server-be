import { Express } from "express";
import { UserHandler } from "../pkg/handler/userHandler";
import { auth } from "../middlewares/authentication";

export class UserRouters {
  private userHandler: UserHandler;

  constructor(handler: UserHandler) {
    this.userHandler = handler;
  }

  public registerRouters(path: string, app: Express): void {
    app.post(`${path}/login`,async (req,res) =>{await this.userHandler.login(req,res)});
    app.post(`${path}/register`, async (req,res) =>{await this.userHandler.register(req,res)});
    app.get(`${path}/data`,auth, async (req,res) =>{await this.userHandler.getUserData(req,res)});
    // app.post(`${path}/login`,this.userHandler.login);
    // app.get(`${path}/data`, this.userHandler.getUserData);
  }
}
