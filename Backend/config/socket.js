import { Server } from "socket.io";
import http from "http";
import express from "express";
import { socketAuthMiddleware } from "../middlewares/socket.js";
import { Env } from "./env.js";
import Message from "./../models/Message.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: Env.BASE_URL,
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const userSocketMap = {};

export const getReciverSocketId = (userId) => {
  return userSocketMap[userId];
};
io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullname);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("updateMessageReaction", async ({ messageId, reaction }) => {
    try {
      const message = await Message.findById(messageId);
      if (!message) return;

      message.reaction = reaction;
      await message.save();

      const participants = [message.senderId, message.receiverId];
      participants.forEach((id) => {
        const socketId = userSocketMap[id];
        if (socketId) {
          io.to(socketId).emit("updatedReaction", { messageId, reaction });
        }
      });

      // Always emit to sender
      socket.emit("updatedReaction", { messageId, reaction });
    } catch (error) {
      console.log("Reaction error:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullname);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export { io, app, server };
