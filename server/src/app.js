//################## IMPORT ################################
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { superAdminRoutes } from "./routes/superAdmin.routes.js";
import { adminRoutes } from "./routes/admin.routes.js";
import { userRoutes } from "./routes/user.routes.js";
import { authRoute } from "./routes/auth.js";

//################################# CONSTANT ############################
const app = express();

//################################# MIDDLEWARE ##########################
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//########################### API END POINT MIDDLEWARE ###################
app.use("/api/v1/superAdmin", superAdminRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Server Working");
});

//######################### EXPORT VARIABLE (REFRENCE) ##################
export { app };
