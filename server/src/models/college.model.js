import mongoose, { Schema } from "mongoose";
import { Course } from "./course.model.js";
import { Student } from "./student.model.js";
import { Branch } from "./branch.model.js";

const CollegeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      capitalize: true,
    },
    address: {
      line1: { type: String, required: true, trim: true },
      line2: { type: String, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      zipCode: { type: String, required: true, trim: true },
    },
    course: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Course,
      },
    ],
    branch: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Branch,
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Student,
      },
    ],
  },
  { timestamps: true }
);

export const College = mongoose.model("College", CollegeSchema);
