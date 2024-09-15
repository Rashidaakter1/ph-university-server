import app from "./app";
import { Server } from "http";
import mongoose from "mongoose";
import config from "./config";

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database__url as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

//For  asynchronous  function
process.on("unhandledRejection", () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// This is for synchronous function
process.on("uncaughtException", () => {
  process.exit(1);
});
