// getting-started.js

import mongoose from "mongoose";
mongoose.set("strictQuery", false);

// connect().catch((err) => console.log(err));

export async function connect() {
  try {
    let mongoHost: string;
    if (process.env.MongoHost) {
      mongoHost = process.env.MongoHost;
    } else {
      mongoHost = "localhost";
    }
    await mongoose.connect(`mongodb://${mongoHost}:27017/test`);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
