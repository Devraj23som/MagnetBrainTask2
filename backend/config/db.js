
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Devraj:thakurdev@cluster0.pinxr.mongodb.net/Ecom?retryWrites=true&w=majority&appName=Cluster0",{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected");
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

export default connectDB;