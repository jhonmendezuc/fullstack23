//const { MongoClient } = require("mongodb");
// or as an es module:
import { MongoClient } from "mongodb";

// Connection URL
const url =
  "mongodb+srv://fullstackuc_fs22:123@cluster0.yupal8y.mongodb.net/?appName=Cluster0";
const client = new MongoClient(url);

// Database Name
const dbName = "sample_mflix";

async function main() {
  // Use connect method to connect to the server
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("movies");
    console.log("Collection:", collection.collectionName);
    console.log("Database:", collection);
    return "done.";
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }

  // the following code examples can be pasted here...
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
