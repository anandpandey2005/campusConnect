import express from "express";

const facultyRoutes = express.Router();

facultyRoutes.get("/profile", (req, res) => {
  res.send("User Profile");
});

export { facultyRoutes };
