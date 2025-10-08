import mongoose, { Schema } from "mongoose";
import { College } from "./college.model.js";
const AdminSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: [true, "name missing"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phonenumber: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "phonumber missing"],
    },
    password: {
      type: String,
      required: [true, "password missing"],
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
      required: [true, "college name missing"],
    },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", AdminSchema);
