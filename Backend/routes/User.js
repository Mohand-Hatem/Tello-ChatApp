import express from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
  updateProfile,
} from "../controllers/User.js";
import { verifyUser } from "../middlewares/auth.js";
import { arcjetVerify } from "../middlewares/arcjet.js";

const router = express.Router();

//just be carefull active this before upload
router.use(arcjetVerify);

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update-profile", verifyUser, updateProfile);
router.get("/check", verifyUser, (req, res) => res.status(200).json(req.user));
// router.get("/", getAllUsers);

export default router;
