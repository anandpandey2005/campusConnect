import express from "express";
import { get_profile } from "../controllers/authentication.controller.js";
import {
  delete_lost_found_product,
  get_lost_found_product,
  lost_found_product,
} from "../controllers/user/lostFoundProduct.user.controller.js";
import { file_upload } from "../utils/cloudinary.utils.js";
import { upload } from "../middleware/multer.middleware.js";

const userRoutes = express.Router();

userRoutes.post("/get-profile-details", get_profile);
userRoutes.post("/add-lostFoundProduct", upload.single("file"), file_upload, lost_found_product);
userRoutes.get("/get-lostFoundProduct", get_lost_found_product);
userRoutes.delete("/delete-lostFoundProduct", delete_lost_found_product);

export { userRoutes };
