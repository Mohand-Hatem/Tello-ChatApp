import express from "express";
import {
  getAllContacts,
  getCharPartners,
  getMessagesBetweenTwo,
  sendMessage,
  updateMessageReaction,
} from "../controllers/Message.js";
import { verifyUser } from "../middlewares/auth.js";

const router = express.Router();
router.use(verifyUser);
router.get("/contacts", getAllContacts);
router.get("/chats", getCharPartners);
router.get("/:id", getMessagesBetweenTwo);
router.put("/reaction", updateMessageReaction);
router.post("/send/:id", sendMessage);

export default router;
