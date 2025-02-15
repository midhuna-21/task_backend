import jwt from "jsonwebtoken";
import { generateUserTokens } from "../utils/jwt/userGenerateToken.js";
import config from "../config/config.js";
import { user } from "../model/userModel.js";

const userRefreshToken = async (req, res) => {
    try {
    
        const cookieName = "userrefreshToken";
        const cookieToken = req.cookies[cookieName];
        if (!cookieToken) {
            return res.status(401).json({
                message: "No token, authorization denied or token mismatch",
            });
        }
        let decoded;
        try {
            decoded = jwt.verify(
                cookieToken,
                config.JWT_SECRET || ""
            ) ;
        } catch (err) {
            console.error("Token verification error", err);
            return res.status(401).json({ message: "Invalid token" });
        }

        if (!decoded || typeof decoded === "string") {
            return res.status(401).json({ message: "Invalid token" });
        }

        let isUser= await user.findById({_id:decoded.userId});
            if (isUser?.isBlocked) {
                return res.status(401).json({ message: "User is blocked" });
            }
      

        if (!isUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const userId = (isUser._id ).toString();
        const tokens = generateUserTokens(res, { userId, role });
        return res.status(200).json({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    } catch (error) {
        console.error("Error in refreshTokenController", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { userRefreshToken };
