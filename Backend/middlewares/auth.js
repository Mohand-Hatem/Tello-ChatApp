import jwt from "jsonwebtoken";
import { Env } from "../config/env.js";
import User from "../models/User.js";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });

    const decode = jwt.verify(token, Env.SECRET_KEY);
    if (!decode)
      return res.status(401).json({ message: "Unauthorized - Invalid token" });

    const user = await User.findOne({ email: decode.email }).select(
      "-password"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
