import mongoose, { Schema } from "mongoose";

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
  },
  { timestamps: true }
);

export const Admin = mongoose.model("Admin", AdminSchema);
