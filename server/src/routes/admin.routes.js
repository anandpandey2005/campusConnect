import express from "express";
import { get_profile } from "../controllers/authentication.controller.js";

const adminRoutes = express.Router();


adminRoutes.get("/", get_profile);
export { adminRoutes };
