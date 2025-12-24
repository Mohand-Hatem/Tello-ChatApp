import express from "express";
import {
  getAllContacts,
  getCharPartners,
  getMessagesBetweenTwo,
  sendMessage,
} from "../controllers/Message.js";
import { verifyUser } from "../middlewares/auth.js";

const router = express.Router();
router.use(verifyUser);
router.get("/contacts", getAllContacts);
router.get("/chats", getCharPartners);
router.get("/:id", getMessagesBetweenTwo);
router.post("/send/:id", sendMessage);

export default router;
