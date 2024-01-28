require("dotenv").config();

import express from "express";
import cors from "cors";

import { UserRepositoryImpl } from "./pkg/repository/userRepository";
import { UserHandlerImpl } from "./pkg/handler/userHandler";
import { UserRouters } from "./routers/userRouters";
import { initSequelize } from "./pkg/repository/db/instances/sequalize";

const { Server } = require("socket.io");
const { join } = require("node:path");


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

const main = async () => {
  try {
    const db = await initSequelize();
    const userRepository = new UserRepositoryImpl(db);
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

main();
