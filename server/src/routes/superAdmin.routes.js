import express from "express";
import {
  super_admin_register,
  super_admin_login,
  logout,
  deleteAccount,
  single_user_registration,
} from "../controllers/authentication.controller.js";
import { get_superAdmin_profile_details } from "../controllers/superAdmin/profie.superAdmin.controller.js";
import { add_course } from "../controllers/superAdmin/course.superAdmin.controller.js";
import { push_notice } from "../controllers/superAdmin/notice.superAdmin.controller.js";
import { file_upload } from "../utils/cloudinary.utils.js";
import { upload } from "../middleware/multer.middleware.js";
import { add_event } from "../controllers/superAdmin/events.superAdmin.controller.js";
//#################### CONSTANT ##########################
const superAdminRoutes = express.Router();

//#################### API END POINT ######################
superAdminRoutes.get("/profile", (req, res) => {
  res.send("User Profile");
});
superAdminRoutes.post("/registration", super_admin_register);
superAdminRoutes.post("/login", super_admin_login);
superAdminRoutes.post("/logout", logout);
superAdminRoutes.post("/deleteAccount", deleteAccount);
superAdminRoutes.post("/get-profile-details", get_superAdmin_profile_details);
superAdminRoutes.post("/single-user-registration", single_user_registration);
superAdminRoutes.post("/add-course", add_course);
superAdminRoutes.post("/push-notice", upload.single("file"), file_upload, push_notice);
superAdminRoutes.post("/add-event", upload.single("file"), file_upload, add_event);

export { superAdminRoutes };
