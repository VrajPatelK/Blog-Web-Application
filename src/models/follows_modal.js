import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export default mongoose.models.follow || mongoose.model("follow", FollowSchema);
