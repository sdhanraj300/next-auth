import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to database");
    });
    connection.on("error", (error) => {
      console.log("Error connecting to database");
      process.exit();
    });
  } catch (error) {
    throw new Error("Error connecting to database");
    console.log(error);
  }
}
