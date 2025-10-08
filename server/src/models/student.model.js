import mongoose, { Schema } from "mongoose";
import { College } from "./college.model.js";
import { Course } from "./course.model.js";
const StudentSchema = new Schema(
  {
    admission_number: {},
    enrollment_number: {},
    first_name: {},
    middle_name: {},
    last_name: {},
    dob: {},
    caste: {},
    email: {},
    phonenumber: {},
    password: {},
    father_first_name: {},
    father_middle_name: {},
    father_last_name: {},
    mother_first_name: {},
    mother_middle_name: {},
    mother_last_name: {},
    College: {
      type: mongoose.Schema.Types.ObjectId,
      ref: College,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Course,
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", StudentSchema);
