import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";
import { Course } from "./course.model.js";
import { Admin } from "./admin.model.js";
import { Notice } from "./notice.model.js";
import { Event } from "./event.model.js";
import bcrypt from "bcrypt";

const SuperAdminSchema = new Schema(
  {
    logo: {
      type: String,
      trim: true,
      default: "",
    },
    code: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "college code must be non-empty"],
    },
    name: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "college name must be non-empty"],
    },
    university: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "university must be non-empty"],
    },
    website: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "email must be non-empty"],
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "phone number must be non-empty"],
    },
    password: {
      type: String,
      required: [true, "password must be non-empty"],
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
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        name: {
          type: String,
          trim: true,
          lowercase: true,
          required: [true, "Course name is required"],
        },
        branch: {
          type: String,
          default: "N/A",
        },
        duration: {
          type: String,
          required: [true, "duration must non empty"], // timeline of course let  example btech- 4years bca - 3year and etc..
        },
      },
    ],
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
      },
    ],
    students: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        fullName: {
          type: String,
          trim: true,
          lowercase: true,
        },
        course: {
          type: String,
          trim: true,
          lowercase: true,
        },
        branch: {
          type: String,
          trim: true,
          lowercase: true,
        },
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
    role: {
      type: String,
      enum: ["superAdmin"],
      default: "superAdmin",
    },
  },
  { timestamps: true }
);

SuperAdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export const SuperAdmin = mongoose.model("SuperAdmin", SuperAdminSchema);
