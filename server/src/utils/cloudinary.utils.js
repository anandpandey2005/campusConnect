import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import env from "dotenv";
import { ApiResponse } from "./apiResponse.utils.js";

env.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const uploadToCloudinary = async (localPath) => {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
      folder: "uploads",
    });
    return result.secure_url;
  } catch (err) {
    throw err;
  }
};

export const file_upload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const localPath = req.file.path;
    let cloudinaryUrl;

    try {
      cloudinaryUrl = await uploadToCloudinary(localPath);
    } catch (err) {
      console.error("Cloudinary upload failed, retrying...", err.message);
      try {
        cloudinaryUrl = await uploadToCloudinary(localPath);
      } catch (err2) {
        console.error("Cloudinary retry failed:", err2.message);
        if (fs.existsSync(localPath)) fs.unlinkSync(localPath);
        return res.status(500).json({ message: "Cloud upload failed after retry" });
      }
    }

    if (fs.existsSync(localPath)) fs.unlinkSync(localPath);

    req.file.cloudinaryUrl = cloudinaryUrl;
    console.log(cloudinaryUrl);
    next();
  } catch (error) {
    console.error("Upload Middleware Error:", error);
    return ApiResponse.error();
  }
};
