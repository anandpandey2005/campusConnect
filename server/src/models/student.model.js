import mongoose, { Schema } from "mongoose";
import { College } from "./college.model.js";
import { Course } from "./course.model.js";

const StudentSchema = new Schema(
  {
    admission_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    enrollment_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    middle_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    caste: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phonenumber: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    father_first_name: {
      type: String,
      required: true,
      trim: true,
    },
    father_middle_name: {
      type: String,
      trim: true,
    },
    father_last_name: {
      type: String,
      required: true,
      trim: true,
    },
    mother_first_name: {
      type: String,
      required: true,
      trim: true,
    },
    mother_middle_name: {
      type: String,
      trim: true,
    },
    mother_last_name: {
      type: String,
      required: true,
      trim: true,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    role: "student",
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", StudentSchema);
