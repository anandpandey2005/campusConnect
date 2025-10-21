//################## IMPORT ################################
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { studentRoutes } from "./routes/student.routes.js";
import { facultyRoutes } from "./routes/faculty.routes.js";
import { adminRoutes } from "./routes/admin.routes.js";
import { upload } from "./middleware/multer.middleware.js";
import { file_upload } from "./utils/cloudinary.utils.js";

//##################### CONSTANT ############################
const app = express();

//################### MIDDLEWARE ##########################
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//#################### API END POINT MIDDLEWARE ###################
app.use("/api/v1/faculty", adminRoutes);
app.use("/api/v1/faculty", facultyRoutes);
app.use("/api/v1/student", studentRoutes);
app.post("/uploads", upload.single("file"), file_upload);

app.get("", (req, res) => {
  res.send("hello");
});
export { app };
