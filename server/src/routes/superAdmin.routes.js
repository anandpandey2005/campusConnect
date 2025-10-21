import express from "express";
import { super_admin_register } from "../controllers/authentication.controller.js";
//#################### CONSTANT ##########################
const superAdminRoutes = express.Router();

//#################### API END POINT ######################
superAdminRoutes.get("/profile", (req, res) => {
  res.send("User Profile");
});
superAdminRoutes.post("/registration", super_admin_register);

export { superAdminRoutes };
