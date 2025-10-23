import mongoose, { Schema } from "mongoose";
import { SuperAdmin } from "./superAdmin.model.js";
import { Course } from "./course.model.js";
import bcrypt from "bcrypt";
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
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export const Admin = mongoose.model("Admin", AdminSchema);
