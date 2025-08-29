import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoutes } from "./routes/user.routes.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", userRoutes);

export { app };
