import mongoose, { Schema } from "mongoose";

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", CourseSchema);
