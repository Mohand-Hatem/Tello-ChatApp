import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../config/arcjet.js";

export const arcjetVerify = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    //Check if "Many Requests" or "Bots" or "Security Policy"
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Too Many Requests .. Try Again Later" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied." });
      } else {
        return res.status(403).json({
          message: "Access denied by security policy.",
        });
      }
    }

    //Check for Bots that act like humans
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }

    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Arjcet Protection Faill", error: error.message });
    next();
  }
};
