import express from "express";
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import cors from "cors";
import dbConnect from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import config from "./config/config.js";


const app = express();
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = ["https://task-frontend-bice-alpha.vercel.app/"];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true
};

// Connect to Database
dbConnect();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.static("public/"));

app.use("/api", userRoutes);

app.listen(config.PORT, () => {
    console.log(`Server running at ${config.PORT}`);
});
