import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["M", "F", "O"],
      default: "M",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
