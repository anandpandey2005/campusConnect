import mongoose, { mongo, Schema } from "mongoose";
import { SuperAdmin } from "./superAdmin.model.js";
import { Course } from "./course.model.js";

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "name must be non-empty"],
    },
    employeeId: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "employee id must be non-empty"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "email must be non-empty"],
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "phonenumber must be non-empty"],
    },
    password: {
      type: String,
      required: [true, "password must be non-empty"],
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperAdmin",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", AdminSchema);
