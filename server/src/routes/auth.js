import express from "express";
import { deleteAccount, login, logout } from "../controllers/authentication.controller.js";
const authRoute = express.Router();

authRoute.post("/login", login);
authRoute.post("logout", logout);
authRoute.post("/delete-account", deleteAccount);

export { authRoute };
