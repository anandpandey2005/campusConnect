import mongoose, { Schema } from "mongoose";
import { SuperAdmin } from "./superAdmin.model.js";
import { Course } from "./course.model.js";

const UserSchema = new Schema(
  {
    admissionNumber: {
      type: String,
      required: [true, "admission nunber  must be non-empty"],
      unique: true,
      trim: true,
    },
    enrollmentNumber: {
      type: String,
      unique: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "name must be non-empty"],
      trim: true,
    },
    dob: {
      type: Date,
      required: [true, "date must be non-empty"],
    },
    caste: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email must be non-empty"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "phone number must be non-empty"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password must be non-empty"],
      minlength: 6,
    },
    fatherName: {
      type: String,
      required: [true, "parents name must be non-empty"],
      trim: true,
    },
    motherName: {
      type: String,
      required: [true, "parents name must be non-empty"],
      trim: true,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperAdmin",
      required: [true, "college must be non-empty"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "course  must be non-empty"],
    },
    role: {
      type: String,
      default: "student",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
