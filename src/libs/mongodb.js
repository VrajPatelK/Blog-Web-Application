import mongoose from "mongoose";
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db-connected");
  } catch (error) {
    console.log("db-connection-error");
  }
  isConnected = true;
};

export default connectDB;
