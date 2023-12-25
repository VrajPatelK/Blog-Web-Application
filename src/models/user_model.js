import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    imgUrl: { type: String },
    tokens: [
      {
        token: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.user || mongoose.model("user", UserSchema);
