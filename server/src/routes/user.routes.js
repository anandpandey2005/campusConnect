import express from "express";
import { get_profile } from "../controllers/authentication.controller.js";
import {
  delete_lost_found_product,
  get_lost_found_product,
  lost_found_product,
} from "../controllers/user/lostFoundProduct.user.controller.js";
import { file_upload } from "../utils/cloudinary.utils.js";
import { upload } from "../middleware/multer.middleware.js";
import { get_events_details } from "../controllers/superAdmin/events.superAdmin.controller.js";

const userRoutes = express.Router();

//###################  post route

userRoutes.get("/", get_profile);
userRoutes.get("/get-event-details", get_events_details);
userRoutes.get("/get-lostFoundProduct", get_lost_found_product);

//###################  post route

userRoutes.post("/add-lostFoundProduct", upload.single("file"), file_upload, lost_found_product);
userRoutes.delete("/delete-lostFoundProduct", delete_lost_found_product);

export { userRoutes };
