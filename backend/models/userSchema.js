import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    // favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
