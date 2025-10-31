import express from "express";
import {
  super_admin_register,
  single_user_registration,
  admin_registration,
  get_profile,
} from "../controllers/authentication.controller.js";
import { add_course } from "../controllers/superAdmin/course.superAdmin.controller.js";
import { push_notice } from "../controllers/superAdmin/notice.superAdmin.controller.js";
import { file_upload } from "../utils/cloudinary.utils.js";
import { upload } from "../middleware/multer.middleware.js";
import { add_event } from "../controllers/superAdmin/events.superAdmin.controller.js";
import {
  campusConnect_add,
  campusConnect_getAll,
} from "../controllers/campusConnect.controller.js";
//#################### CONSTANT #####################################################
const superAdminRoutes = express.Router();

//#################### API END POINT ################################################
superAdminRoutes.post("/register", upload.single("file"), file_upload, super_admin_register);
superAdminRoutes.post("/single-admin-register", admin_registration);
superAdminRoutes.post("/single-user-register", single_user_registration);
superAdminRoutes.post("/get-profile-details", get_profile);
superAdminRoutes.post("/add-course", add_course);
superAdminRoutes.post("/push-notice", upload.single("file"), file_upload, push_notice);
superAdminRoutes.post("/add-event", upload.single("file"), file_upload, add_event);

//######################### TESTING API #############################################
superAdminRoutes.post(
  "/campus-connect-add-gallery",
  upload.single("file"),
  file_upload,
  campusConnect_add
);
superAdminRoutes.get("/campus-connect-all", campusConnect_getAll);

//######################## EXPORT VAARIBALE (REFRENCE) ################################
export { superAdminRoutes };
