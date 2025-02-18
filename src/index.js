import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import dbConnect from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import config from "./config/config.js";

const app = express();

// ✅ Correct CORS Configuration
const corsOptions = {
    origin: "https://task-frontend-development.vercel.app", // ✅ Allow only your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true // ✅ This is required for cookies/auth headers
};

// Connect to Database
dbConnect();

// Middlewares
app.use(cors(corsOptions)); // ✅ Apply CORS before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static("public/"));

// ✅ Handle Preflight Requests
app.options("*", cors(corsOptions));

// Routes
app.use("/api", userRoutes);

// Start Server
app.listen(config.PORT, () => {
    console.log(`Server running at ${config.PORT}`);
});
