import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

const client = new MongoClient(url);

let db;

export const connectDB = async () => {
  try {
    if (!db) {
      await client.connect();
      db = client.db(dbName);
      console.log("MongoDB connected successfully");
    }
    return db;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export const collectionName = process.env.DB_COLLECTION;
