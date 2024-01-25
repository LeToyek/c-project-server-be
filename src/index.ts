import express, { Response } from "express";
import cors from "cors";
import path from "path";
import { User } from "./pkg/repository/db/models/user";
import { sequelize } from "./pkg/repository/db/instances/sequalize";
import { initRepository } from "./pkg/repository/repository";
import { initRouters } from "./routers/routers";
import { UserRouters } from "./routers/userRouters";
import { UserHandlerImpl } from "./pkg/handler/userHandler";
import { UserRepositoryImpl } from "./pkg/repository/userRepository";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res)  =>  {
  try {
    return res.json({ message: "Hello World" });
  } catch (error) {
    return res.json({ error: error });
  }
});

app.post("/", (req, res:Response) => {
  const { name, email } = req.body;
  return res.json({ name, email });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    initRepository(sequelize);
    await sequelize.sync();
    
    const userRepository = new UserRepositoryImpl(sequelize);
    const userHandler = new UserHandlerImpl(userRepository);
    const router = new UserRouters(userHandler);

    router.registerRouters(app);
    
    
    app.listen(3000, () => {
      console.log("Server started on port http://localhost:3000");
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start()
