import article_model from "@/models/article_model";
import mongoose from "mongoose";
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URL_v2);

    var article_model_indexes = await article_model.collection.getIndexes();
    if (!article_model_indexes.hasOwnProperty("title_text_description_text")) {
      await article_model.collection.createIndex({
        title: "text",
        description: "text",
      });
      // console.log("text_index created for article modal !");
    }
  } catch (error) {}
  isConnected = true;
};

export default connectDB;
