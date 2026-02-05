import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    size: String,
    brand: String,
    images: [String],
    status: {
      type: String,
      enum: ["te_koop", "verkocht"],
      default: "te_koop",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
