import mongoose, { Schema } from "mongoose";
import { Student } from "./student.model.js";
import { Course } from "./course.model.js";
import { Admin } from "./admin.model.js";
import { Notice } from "./notice.model.js";
import { Faculty } from "./faculty.model.js";
import { Event } from "./event.model.js";
import bcrypt from "bcrypt";

const CollegeSchema = new Schema(
  {
    logo: {
      type: String,
      trim: true,
    },
    code: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "college code missing"],
      unique: true,
    },
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "college name missing"],
    },
    university: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "college university missing"],
    },
    website: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "email missing"],
    },
    phonenumber: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "phonenumber missing"],
    },
    password: {
      type: String,
      required: [true, "password missing"],
    },
    address: {
      line1: {
        type: String,
        trim: true,
        default: "",
      },
      line2: {
        type: String,
        trim: true,
        default: "",
      },
      line3: {
        type: String,
        trim: true,
        default: "",
      },
      pincode: {
        type: String,
        trim: true,
        default: "",
      },
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
      },
    ],
    faculties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    notices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notice",
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  { timestamps: true }
);

CollegeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export const College = mongoose.model("College", CollegeSchema);
