import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret="1234tvbsd"

export const authVerification = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)

    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token expired or invalid" });
      }

      req.user = decoded.userId;
      next();
    });
  } catch (error) {
    console.error("Error in authVerification middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
