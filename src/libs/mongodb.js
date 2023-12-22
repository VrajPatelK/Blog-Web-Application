import mongoose from "mongoose";
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    // "mongodb+srv://vrajpatel4801:WGa1Fou2DuijDUbf@cluster0.4yx5v3a.mongodb.net/"
    await mongoose.connect(process.env.MONGO_URL_v2);
    console.log("db-connected");
  } catch (error) {
    console.log("db-connection-error", error);
  }
  isConnected = true;
};

export default connectDB;
