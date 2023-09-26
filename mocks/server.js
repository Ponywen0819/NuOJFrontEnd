import express from "express";
import { createAPIRoute } from "./apis/index.js";
import pause from "connect-pause";
const server = express();
server.use(pause(1000));
server.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  // res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
server.use("/api", createAPIRoute());

server.listen(3001, () => {
  console.log("JSON Server is running");
});
