import User from "../models/User.js";
import { generateToken } from "../config/utils.js";
import { sendNewUser } from "../emails/emailResend.js";
import cloudinary from "../config/cloudinary.js";

export const signupUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>?/\\|`~]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least 1 uppercase letter, 1 number, 1 symbol, and be at least 8 characters.",
      });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const newUser = new User({
      fullname,
      email,
      password,
    });

    if (newUser) {
      await newUser.save();
      const token = generateToken(newUser, res);
      res.status(201).json({
        message: "User Created Successfully",
        data: {
          fullname,
          email,
        },
        token,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }

    try {
      await sendNewUser(newUser.fullname);
    } catch (error) {
      console.error("Failed to send welcome email:", error);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPassword = await user.comparePassword(password);
    if (!isPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user, res);

    res.status(200).json({
      message: "Login Seccussfuly: Wellcome",
      data: {
        fullname: user.fullname,
        email: user.email,
        profilePic: user.profilePic,
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const logoutUser = (_, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ message: "Logout Seccussfuly" });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic)
      return res.status(400).json({ message: "Profile pic is required" });

    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "Tello",
    });

    //get User From Request and Update it to add Profile Pic
    const userId = req.user._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
