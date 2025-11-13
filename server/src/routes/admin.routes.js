import express from "express";
import { get_profile } from "../controllers/authentication.controller.js";

const adminRoutes = express.Router();

// ############# GET API END POINT  ###########################
adminRoutes.get("/", get_profile);

//################ POST API END POINT #########################
export { adminRoutes };
