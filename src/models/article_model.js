import mongoose from "mongoose";

const validatePrivacy = (value) => {
  return value === "private" || value === "public";
};

const validateStatus = (value) => {
  return value === "published" || value === "pending";
};

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String },
    tags: [{ type: String }],
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    privacy: {
      type: String,
      validate: {
        validator: validatePrivacy,
        message: 'Privacy must be "private" or "public".',
      },
      default: "public",
    },
    status: {
      type: String,
      validate: {
        validator: validateStatus,
        message: 'Status must be "published" or "pending".',
      },
      default: "published",
    },
  },
  { timestamps: true }
);

export default mongoose.models.article ||
  mongoose.model("article", ArticleSchema);
