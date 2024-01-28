import { Sequelize } from "sequelize";
import { initUser } from "../models/user";


export const initSequelize = async () => {
    try {
        const sequelize = new Sequelize(
            "cprojector",
            "postgres",
            "handoko",
            {
                host: "localhost",
                dialect: "postgres",
                port: 5432,
                logging: false,
            }
        )
        await sequelize.authenticate()

        // init models
        initUser(sequelize)

        await sequelize.sync()
        return sequelize;
    } catch (err) {
        throw "Failed to connect to database: " + err
    }
}