import mongoose, { Schema } from "mongoose";
import { Course } from "./course.model.js";
import { User } from "./user.model.js";
import { Branch } from "./branch.model.js";

const CollegeSchema = new Schema(
  {
    logo: {
      type: String,
      default:
        "https://fastly.picsum.photos/id/350/200/200.jpg?hmac=-NwRXVlLAsHSv2w1c-2f87EaJ_177lOazxTj_4-Gdmw",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      capitalize: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
      default: "#",
    },
    contact: {
      mob1: {
        type: Number,
        trim: true,
      },
      mob2: {
        type: Number,
        trim: true,
      },
      tel: {
        type: Number,
        trim: true,
      },
      landline: {
        type: Number,
        trim: true,
      },
    },
    address: {
      line1: { type: String, required: true, trim: true },
      line2: { type: String, trim: true },
      city: { type: String, required: true, trim: true },
      state: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      zipCode: { type: String, required: true, trim: true },
    },
    course: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Course,
      },
    ],
    studentslist_enrollment: [
      {
        type: Number,
        required: true,
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
    ],
  },
  { timestamps: true }
);

export const College = mongoose.model("College", CollegeSchema);
