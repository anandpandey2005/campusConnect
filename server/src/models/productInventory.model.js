import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema(
  {
    image: {},
  },
  { _id: false }
);

const productInventorySchema = new Schema(
  {
    images: {
      type: String,
      trim: true,
      default: "https://res.cloudinary.com/dxela17ca/image/upload/v1761718278/nocontent_pv8nwh.png",
    },
    title: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "title must be non-empty"],
    },
    description: {
      type: String,
      lowercase: true,
      trim: true,
      default: null,
    },
    price: {
      type: Number,
      required: [true, "price must be non-empty"],
      min: 0,
      validate: {
        validator: function (v) {
          return Number(v.toFixed(2)) === v;
        },
        message: "price must have max 2 decimal digits",
      },
    },

    createdBy: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      model: {
        type: String,
        required: true,
        enum: ["Admin", "User", "SuperAdmin"],
      },
    },
  },
  { timestamps: true }
);

export const ProductInventory = mongoose.model("ProductInventory", productInventorySchema);
