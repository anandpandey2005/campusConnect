import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";

const LostFoundProductSchema = new Schema(
  {
    image: {
      type: String,
      trim: true,
      default: "https://res.cloudinary.com/dxela17ca/image/upload/v1761718278/nocontent_pv8nwh.png",
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Title must not be empty"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    venue: {
      type: String,
      trim: true,
      required: [true, "Venue must not be empty"],
    },
    dateTime: {
      type: Date,
      required: [true, "Date and time must not be empty"],
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    contact: {
      type: String,
      trim: true,
      default: "N/A",
    },
    handoverTo: {
      type: String,
      trim: true,
      default: "N/A",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Posted by reference is required"],
      refPath: "createdByModel",
    },
    createdByModel: {
      type: String,
      required: true,
      enum: ["user", "admin", "superAdmin"],
    },
    branch: {
      type: String,
      trim: true,
      default: "N/A",
    },
    tag: [
      {
        type: String,
        trim: true,
        default: "Lost Item",
      },
    ],
  },
  { timestamps: true }
);

export const LostFoundProduct = mongoose.model("LostFoundProduct", LostFoundProductSchema);
