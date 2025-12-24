import jwt from "jsonwebtoken";
import { Env } from "./env.js";

export const generateToken = (newUser, res) => {
  const token = jwt.sign(
    {
      id: newUser._id,
      fullname: newUser.fullname,
      email: newUser.email,
    },
    Env.SECRET_KEY,
    { expiresIn: "1d" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};
