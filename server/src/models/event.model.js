import mongoose, { Schema } from "mongoose";
import { College } from "./college.model.js";

const EventSchema = new Schema(
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
    link: {
      type: String,
      trim: true,
    },
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: College,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", EventSchema);
