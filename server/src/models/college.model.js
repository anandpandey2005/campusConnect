import mongoose, { Schema } from "mongoose";

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
    campus: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "college campus missing"],
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
      required: [true, "passwrod missing"],
    },
    address: {
      line1: {
        type: String,
        trim: true,
        required: [true, "line 1 field missing"],
      },
      line2: {
        type: String,
        trim: true,
        required: [true, "line 2 field missing"],
      },
      line3: {
        type: String,
        trim: true,
      },
      pincode: {
        type: String,
        trim: true,
        required: [true, "pincode missing"],
      },
    },
  },
  { timestamps: true }
);

export const College = mongoose.model("College", CollegeSchema);
