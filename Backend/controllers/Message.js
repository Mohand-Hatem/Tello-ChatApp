import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../config/cloudinary.js";
import { getReciverSocketId, io } from "../config/socket.js";

export const getAllContacts = async (req, res) => {
  try {
    const MyUser = await User.findOne({ email: req.user.email });
    const filterdUser = await User.find({
      email: { $ne: MyUser.email },
    }).select("-password");

    res.status(200).json({ message: "Here is All Contact", data: filterdUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMessagesBetweenTwo = async (req, res) => {
  try {
    const FirstUserId = req.user._id;
    const { id: SecondUserId } = req.params;
    const AllMessagesInBetween = await Message.find({
      $or: [
        { senderId: FirstUserId, receiverId: SecondUserId },
        { senderId: SecondUserId, receiverId: FirstUserId },
      ],
    });

    res
      .status(200)
      .json({ message: "All Messages Between Us", data: AllMessagesInBetween });
  } catch (error) {
    res.status(200).json({ message: "Server error", error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    if (!text && !image) {
      return res.status(400).json({ message: "Text or image is required." });
    }
    if (senderId.equals(receiverId)) {
      return res
        .status(400)
        .json({ message: "Cannot send messages to yourself." });
    }
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found." });
    }

    let imageUrl;
    if (image) {
      const uploadRespone = await cloudinary.uploader.upload(image, {
        folder: "Tello",
      });
      imageUrl = uploadRespone.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const ReciverUserSokectId = getReciverSocketId(receiverId);
    if (ReciverUserSokectId) {
      io.to(ReciverUserSokectId).emit("newMessage", newMessage);
    }

    res.status(201).json({ message: "New Message...", data: newMessage });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getCharPartners = async (req, res) => {
  try {
    const logedInUserId = req.user._id;

    const messagesBetweenUs = await Message.find({
      $or: [{ senderId: logedInUserId }, { receiverId: logedInUserId }],
    });

    const chatPartnersId = [
      ...new Set(
        messagesBetweenUs.map((msg) =>
          msg.senderId.toString() === logedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnersId },
    }).select("-password");

    res.status(200).json({ message: "Chat Partners..", data: chatPartners });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
