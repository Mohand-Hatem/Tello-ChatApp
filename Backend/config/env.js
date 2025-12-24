import dotenv from "dotenv";
dotenv.config();

export const Env = {
  PORT: process.env.PORT_NUM || 500,
  MONGO_URL: process.env.MONGO_URL,
  SECRET_KEY: process.env.SECRET_KEY,
  RESEND_EMAIL: process.env.RESEND_EMAIL,
  RESEND_KEY: process.env.RESEND_KEY,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  ARCJET_KEY: process.env.ARCJET_KEY,
  ARCJET_ENV: process.env.ARCJET_ENV,
  BASE_URL: process.env.BASE_URL,
};
