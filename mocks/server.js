import express from "express";
import { createAPIRoute } from "./apis/index.js";

const server = express();
server.use("/api", createAPIRoute());

server.listen(3001, () => {
  console.log("JSON Server is running");
});
