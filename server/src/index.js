import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDb.config.js";
dotenv.config();
const PORT = process.env.PORT || 5000;

//tagline of this software
// No more searching classrooms – just connect on CampusConnect.

async function startServer() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}
startServer();
