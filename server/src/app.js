//################## IMPORT ################################
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { studentRoutes } from "./routes/student.routes.js.js";
import { facultyRoutes } from "./routes/faculty.routes.js";
import { adminRoutes } from "./routes/admin.routes.js";

//##################### CONSTANT ############################
const app = express();

//################### MIDDLEWARE ##########################
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/faculty", adminRoutes);
app.use("/api/v1/faculty", facultyRoutes);
app.use("/api/v1/student", studentRoutes);

export { app };
