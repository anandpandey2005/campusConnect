import express from "express";
import { get_profile } from "../controllers/authentication.controller.js";

const userRoutes = express.Router();

userRoutes.post("/get-profile-details", get_profile);

export { userRoutes };
