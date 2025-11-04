import mongoose, { Schema } from "mongoose";
import { SuperAdmin } from "./superAdmin.model.js";
import { Course } from "./course.model.js";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    admissionNumber: {
      type: String,
      required: [true, "admission nunber  must be non-empty"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    enrollmentNumber: {
      type: String,
      unique: true,
      trim: true,
      default: "N/A",
    },
    fullName: {
      type: String,
      required: [true, "name must be non-empty"],
      trim: true,
      lowercase: true,
    },
    dob: {
      type: Date,
      required: [true, "date must be non-empty"],
    },
    caste: {
      type: String,
      trim: true,
      default: "N/A",
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
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password must be non-empty"],
      minlength: [6, "atleast six character"],
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
    course: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: [true, "course  must be non-empty"],
        },
        name: {
          type: String,
          trim: true,
          lowercase: true,
        },
        branch: {
          type: String,
          lowercase: true,
        },
      },
    ],
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
export const User = mongoose.model("User", UserSchema);
