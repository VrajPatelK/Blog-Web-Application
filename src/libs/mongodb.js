import article_model from "@/models/article_model";
import mongoose from "mongoose";
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    // "mongodb+srv://vrajpatel4801:WGa1Fou2DuijDUbf@cluster0.4yx5v3a.mongodb.net/"
    await mongoose.connect(process.env.MONGO_URL_v2);

    var article_model_indexes = await article_model.collection.getIndexes();
    if (!article_model_indexes.hasOwnProperty("title_text_description_text")) {
      await article_model.collection.createIndex({
        title: "text",
        description: "text",
      });
      // console.log("text_index created for article modal !");
    }

    console.log("db-connected");
  } catch (error) {
    console.log("db-connection-error", error);
  }
  isConnected = true;
};

export default connectDB;
