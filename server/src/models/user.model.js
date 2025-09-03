import mongoose, { Schema } from "mongoose";
import { Branch } from "./branch.model.js";
import { Course } from "./course.model.js";

const UserSchema = new Schema(
  {
    avatar: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Course,
      required: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Branch,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", StudentSchema);
