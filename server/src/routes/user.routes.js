import express from "express";
const userRoutes = express.Router();

userRoutes.get("/profile", (req, res) => {
  res.send("User Profile");
});

export { userRoutes };
