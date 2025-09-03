import mongoose, { Schema } from "mongoose";
import slugify from "slugify";

const BranchSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Pre-save slugify
BranchSchema.pre("save", function (next) {
  if (this.isModified("name") && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Optional: handle slugify on update
BranchSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
    this.setUpdate(update);
  }
  next();
});

export const Branch = mongoose.model("Branch", BranchSchema);
