import mongoose, { mongo, Schema } from "mongoose";
import { College } from "./college.model.js";
import { Course } from "./course.model.js";
const FacultySchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "name missing"],
      trim: true,
    },
    employee_id: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "employee id missing"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phonenumber: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "phonumber missing"],
    },
    password: {
      type: String,
      required: [true, "password missing"],
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: [true, "college name missing"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "faculty branch name missing"],
    },
  },
  { timestamps: true }
);

export const Faculty = mongoose.model("Faculty", FacultySchema);
