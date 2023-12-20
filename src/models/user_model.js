import mongoose from "mongoose";
// import JWT from "jsonwebtoken";

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
    favArticles: [
      {
        favArticle: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "article",
        },
      },
    ],
    followers: [
      {
        follower: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.user || mongoose.model("user", UserSchema);

// UserSchema.methods.createToken = async (user) => {
//   try {
//     const TOKEN = JWT.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY);
//     user.tokens.push({ token: TOKEN });
//     return TOKEN;

//     //
//   } catch (error) {
//     return {
//       swr: true,
//       msg: "error at token creation",
//     };
//   }
// };
