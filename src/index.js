import express from "express";
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import cors from "cors";
import dbConnect from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import config from "./config/config.js";


const app = express();


dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.static("public/"));


app.use(cors({
    origin: config.API_URL,
    credentials: true
}))
app.use("/api", userRoutes);

app.listen(config.PORT, () => {
    console.log(`Server running at ${config.PORT}`);
});
