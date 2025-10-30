import mongoose, { Schema } from "mongoose";

const CampusConnectSchema = new Schema(
  {
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const CampusConnect = mongoose.model("CampusConnect", CampusConnectSchema);
