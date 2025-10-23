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
      required: [true, "duration must non empty"], // timeline of course let  example btech- 4years bca - 3year and etc..
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", CourseSchema);
