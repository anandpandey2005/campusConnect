//################## IMPORT ################################
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { superAdminRoutes } from "./routes/superAdmin.routes.js";
import { adminRoutes } from "./routes/admin.routes.js";
import { userRoutes } from "./routes/user.routes.js";
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
app.use("/api/v1/superAdmin", superAdminRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);
// app.post("/uploads", upload.single("file"), file_upload);

app.get("", (req, res) => {
  res.send("hello");
});
export { app };
