import mongoose from "mongoose";

const LikerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "article",
    required: true,
  },
});

export default mongoose.models.liker || mongoose.model("liker", LikerSchema);
