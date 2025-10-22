import express from "express";
import {
  super_admin_register,
  super_admin_login,
  logout,
  deleteAccount,
} from "../controllers/authentication.controller.js";
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

export { superAdminRoutes };
