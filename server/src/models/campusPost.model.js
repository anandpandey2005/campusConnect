import mongoose from "mongoose";
import { User } from "./user.model.js";

const collegePostSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default:
        "https://fastly.picsum.photos/id/350/200/200.jpg?hmac=-NwRXVlLAsHSv2w1c-2f87EaJ_177lOazxTj_4-Gdmw",
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      required: true,
    },
    handover: {
      type: String,
      trim: true,
    },
    place: {
      type: String,
      trim: true,
    },
    timeline: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const CollegePost = mongoose.model("CollegePost", collegePostSchema);
