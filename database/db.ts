import mongoose from "mongoose";

/* 
  0 = disconnect
  1 = connected
  2 = connecting
  3 = disconnecting
*/
const MONGO_URL = process.env.MONGO_URL || "";
const mongooConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongooConnection.isConnected) {
    console.log("we are connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    mongooConnection.isConnected = mongoose.connections[0].readyState;
    if (mongooConnection.isConnected === 1) {
      console.log("we are connected");
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect(MONGO_URL);
  mongooConnection.isConnected = 1;
  console.log("Connected to MongoDB", MONGO_URL);
};

export const disconnect = async () => {
  if (mongooConnection.isConnected === 0) return;
  await mongoose.disconnect();

  console.log("Disconnected");
};
