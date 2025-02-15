import {
    comparePassword,
    hashPassword,
} from "../utils/ReuseFunctions/passwordValidation.js";
import { generateUserTokens } from "../utils/jwt/userGenerateToken.js";
import { user } from "../model/userModel.js";


const createNewUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        let existUser = await user.findOne({email:email});
        if (existUser) {
            return res.status(400).json({ message: "Email already exist" });
        }
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                message: "Please ensure all required fields are filled out.",
            });
        }
        const securePassword = await hashPassword(password);
        const newUser = await new user({
            name,
            email,
            phone,
            password: securePassword
        }).save()
        return res.status(200).json({ user:newUser });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: "Internal server error" });
    }
};

const authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let isUser = await user.findOne({email:email});
        if (!isUser) {
            return res.status(401).json({ message: "Invalid email" });
        }
        if (!isUser.password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const isPasswordValid = await comparePassword(password, isUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const userId = isUser._id;
        const { accessToken, refreshToken } = generateUserTokens(res, userId);
     
        return res.status(200).json({ user:isUser, accessToken, refreshToken });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export {
    createNewUser,
    authenticateUser,
   
};
