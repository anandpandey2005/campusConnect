import mongoose, { Schema } from "mongoose";
import { SuperAdmin } from "./superAdmin.model.js";
const NoticeSchema = new Schema(
  {
    refer_to: {
      type: String,
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
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "College",
    },
  },
  { timestamps: true }
);

export const Notice = mongoose.model("Notice", NoticeSchema);
