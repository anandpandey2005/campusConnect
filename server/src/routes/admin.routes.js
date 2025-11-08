import express from "express";
import { get_profile } from "../controllers/authentication.controller.js";

const adminRoutes = express.Router();

adminRoutes.get("/profile", (req, res) => {
  res.send("User Profile");
});
adminRoutes.get("/get-profile-details", get_profile);
export { adminRoutes };
