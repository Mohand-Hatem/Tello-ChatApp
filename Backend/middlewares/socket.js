import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { Env } from "../config/env.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    //Check From Token if Valid
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No Token Provided"));
    }

    //Decode Token Detalis
    const decoded = jwt.verify(token, Env.SECRET_KEY);
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid Token"));
    }

    //get User
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("User not found"));
    }

    socket.user = user;
    socket.userId = user._id.toString();
    next();
  } catch (error) {
    console.log("Error in socket authentication:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};
