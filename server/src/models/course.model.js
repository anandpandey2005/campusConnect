import mongoose, { Schema } from "mongoose";
import { SuperAdmin } from "./superAdmin.model.js";
const CourseSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Course name is required"],
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: [true, "College reference is required"],
    },
    branch: {
      type: String,
      default: "N/A",
    },
    duration: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", CourseSchema);
