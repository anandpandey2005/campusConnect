import mongoose, { Schema } from "mongoose";
import { Student } from "./student.model.js";
import { Course } from "./course..js";
import { Admin } from "./admin.model.js";
import { Notice } from "./notice.model.js";
import { Faculty } from "./faculty.model.js";
import { Event } from "./event.model.js";

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
        ref: Course,
      },
    ],
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Admin,
      },
    ],
    faculties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Faculty,
      },
    ],
    students: [
      {
        type: mongoose.Schema.type.ObjectId,
        ref: Student,
      },
    ],
    notices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Notice,
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Event,
      },
    ],
  },
  { timestamps: true }
);

export const College = mongoose.model("College", CollegeSchema);
