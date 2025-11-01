import express from "express";
import { get_profile } from "../controllers/authentication.controller.js";
import {
  get_lost_found_product,
  lost_found_product,
} from "../controllers/user/lostFoundProduct.user.controller.js";

const userRoutes = express.Router();

userRoutes.post("/get-profile-details", get_profile);
userRoutes.post("/add-lostFoundProduct", lost_found_product);
userRoutes.get("/lostFoundProduct", get_lost_found_product);

export { userRoutes };
