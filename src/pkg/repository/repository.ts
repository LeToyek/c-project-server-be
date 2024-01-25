import { DataTypes, Sequelize } from "sequelize";
import { User, initUser } from "./db/models/user";

export const initRepository =  (sequelize: Sequelize) => {
   initUser(sequelize);
}