import express, { Response } from "express";
import cors from "cors";
// import { sequelize } from "./pkg/repository/db/instances/sequalize";
import { UserRepositoryImpl } from "./pkg/repository/userRepository";
import { UserHandlerImpl } from "./pkg/handler/userHandler";
import { UserRouters } from "./routers/userRouters";
import { Sequelize } from "sequelize";
import { initUser } from "./pkg/repository/db/models/user";
// import { WebSocket, WebSocketServer } from "ws";
const { Server } = require("socket.io");
const { join } = require("node:path");
require("dotenv").config();

const app = express();
const server = require("http").createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket:any) => {
  console.log("a user connected");
  
  socket.on("chat message", (msg:string) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });

  socket.on("hello",(msg:string)=>{
    console.log("message: " + msg);
  })
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
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
    initUser(sequelize);
    await sequelize.sync();

    const userRepository = new UserRepositoryImpl(sequelize);
    const userHandler = new UserHandlerImpl(userRepository);
    const userRouter = new UserRouters(userHandler);
    userRouter.registerRouters("/users", app);

    server.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
    
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
