import express from "express";
const studentRoutes = express.Router();

studentRoutes.get("/profile", (req, res) => {
  res.send("User Profile");
});

export { studentRoutes };
