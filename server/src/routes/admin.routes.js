import express from "express";
const adminRoutes = express.Router();

adminRoutes.get("/profile", (req, res) => {
  res.send("User Profile");
});

export { adminRoutes };
