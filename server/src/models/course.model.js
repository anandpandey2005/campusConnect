import mongoose, { Schema } from "mongoose";
import { Branch } from "./branch.model.js";

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Branch,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", CourseSchema);
