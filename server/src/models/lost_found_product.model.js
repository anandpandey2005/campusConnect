import mongoose, { Schema } from "mongoose";
import { Student } from "./student.model.js";

const ProductPostSchema = new Schema(
  {
    image: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      required: [true, "title missing"],
    },
    description: {
      type: String,
      trim: true,
    },
    tags: [{ type: string, trim: true, lowercase: true }],
    status: ["open", "close"],
    handhover_to: {
      type: String,
      trim: true,
      lowercase: true,
    },
    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  { timestamps: true }
);

export const ProductPost = mongoose.model("ProductPost", ProductPostSchema);
