import express from "express";
import { logout, User_login } from "../controllers/authentication.controller.js";
import { get_user_profile_details } from "../controllers/user/profile.user.controller.js";

const userRoutes = express.Router();

userRoutes.post("/login", User_login);
userRoutes.post("/logout", logout);
userRoutes.post("/get-profile-details", get_user_profile_details);

export { userRoutes };
