import express from "express";
import { get_user_profile_details } from "../controllers/user/profile.user.controller.js";

const userRoutes = express.Router();

userRoutes.post("/get-profile-details", get_user_profile_details);

export { userRoutes };
