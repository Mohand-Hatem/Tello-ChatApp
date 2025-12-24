import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDB from "./config/db.js";
import User from "./routes/User.js";
import Message from "./routes/Message.js";
import { Env } from "./config/env.js";
import { app, server } from "./config/socket.js";

//Some Configs Middlewares
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: Env.BASE_URL,
    credentials: true,
  })
);

//End Configs Middlewares

//Start Route

app.use("/api/message", Message);
app.use("/api/user", User);

//Start Server
const Port = Env.PORT_NUM || 5000;
server.listen(Port, () => {
  console.log(`Server Connected Successfully on Port: ${Port}`);
  ConnectDB();
});
