import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    title: String,
    description: String,
    price: Number,
    brand: String,
    images: [String],
    status: {
      type: String,
      enum: ["te koop", "verkocht"],
      default: "te koop",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
