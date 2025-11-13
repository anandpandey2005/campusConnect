import mongoose, { Schema } from "mongoose";
import { SuperAdmin } from "./superAdmin.model.js";
const NoticeSchema = new Schema(
  {
    link: {
      type: String,
      default: "#",
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "notice missing"],
    },
    description: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
    },
  },
  { timestamps: true }
);

export const Notice = mongoose.model("Notice", NoticeSchema);
