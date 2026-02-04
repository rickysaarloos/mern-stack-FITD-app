import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {               // optioneel
      type: String,
    },
    bio: {                  // optioneel
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
