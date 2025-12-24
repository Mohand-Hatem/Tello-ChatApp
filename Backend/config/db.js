import mongoose from "mongoose";
import { Env } from "./env.js";

//Connected To Database
const ConnectDB = async () => {
  try {
    await mongoose.connect(Env.MONGO_URL);
    console.log("Mongo Database Connected Successsfully");
  } catch (error) {
    console.log("Error Database", error);
    process.exit(1);
  }
};

export default ConnectDB;
