import { Sequelize } from "sequelize";


export const sequelize :Sequelize = new Sequelize(
    "cprojector",
    "postgres",
    "handoko",
    {
        host: "localhost",
        dialect: "postgres",
        port: 5432,
    }
);

