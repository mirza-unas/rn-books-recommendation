import jwt from "jsonwebtoken";
import User from "../models/User.js";
const protectRoute = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    console.log("token :", token);

    if (!token)
      return res
        .status(401)
        .json({ message: "No unauthorized token, access denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded :", decoded);

    const user = await User.findById(decoded.userId).select("-password");
    console.log("user :", user);

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default protectRoute;
