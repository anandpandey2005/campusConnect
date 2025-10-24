import mongoose, { Schema } from "mongoose";
import { SuperAdmin } from "./superAdmin.model.js";

const EventSchema = new Schema(
  {
    image: {
      type: String,
      trim: true,
      default: "#",
    },
    title: {
      type: String,
      trim: true,
      required: [true, "title missing"],
    },
    description: {
      type: String,
      trim: true,
      lowercase: true,
    },
    link: {
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

export const Event = mongoose.model("Event", EventSchema);
