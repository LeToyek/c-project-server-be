import express, { Response } from "express";
import cors from "cors";
// import { sequelize } from "./pkg/repository/db/instances/sequalize";
import { UserRepositoryImpl } from "./pkg/repository/userRepository";
import { UserHandlerImpl } from "./pkg/handler/userHandler";
import { UserRouters } from "./routers/userRouters";
import { Sequelize } from "sequelize";
import { initUser } from "./pkg/repository/db/models/user";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    return res.json({ message: "Hello World" });
  } catch (error) {
    return res.json({ error: error });
  }
});

app.post("/", (req, res: Response) => {
  const { name, email } = req.body;
  return res.json({ name, email });
});

const start = async () => {
  try {
    const sequelize: Sequelize = new Sequelize(
      "cprojector",
      "postgres",
      "handoko",
      {
        host: "localhost",
        dialect: "postgres",
        port: 5432,
      }
    );
    await sequelize.authenticate();
    initUser(sequelize)
    await sequelize.sync();
    
    const userRepository = new UserRepositoryImpl(sequelize)
    const userHandler = new UserHandlerImpl(userRepository)
    const userRouter = new UserRouters(userHandler)
    userRouter.registerRouters("/users", app)

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start()
