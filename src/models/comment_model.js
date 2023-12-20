import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  commentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "article",
    required: true,
  },
  msg: { type: String, required: true },
  comment_date: { type: String, required: true },
});

export default mongoose.models.comment ||
  mongoose.model("comment", CommentSchema);
