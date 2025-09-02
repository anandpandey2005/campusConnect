import mongoose, { Schema } from "mongoose";

const BranchSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Branch = mongoose.model("Branch", BranchSchema);
