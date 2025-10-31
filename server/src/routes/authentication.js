import express from "express";
import { deleteAccount, login, logout } from "../controllers/authentication.controller.js";
const authenticationRoute = express.Router();

authenticationRoute.post("/login", login);
authenticationRoute.post("logout", logout);
authenticationRoute.post("/delete-account", deleteAccount);

export { authenticationRoute };
