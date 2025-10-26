import mongoose, { Schema } from "mongoose";
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
      unique: true,
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
      required: [true, "phone number must be non-empty"],
    },
    password: {
      type: String,
      required: [true, "password must be non-empty"],
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperAdmin",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "department must be non-empty"],
    },
    subjects: [
      {
        subject: {
          type: String,
          required: [true, "appointed subject must be non-empty"],
          lowercase: true,
          trim: true,
        },
      },
    ],
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
