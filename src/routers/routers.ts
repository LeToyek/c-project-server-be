import { Express } from "express";
import { Sequelize } from "sequelize";
import { UserRouters } from "./userRouters";

export const initRouters = (app:Express,db:Sequelize) => {
    new UserRouters(app,db).initRouters();
};
