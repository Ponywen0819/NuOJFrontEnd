/** @format */

import express from "express";
import { createAPIRoute } from "./apis/index.js";
import pause from "connect-pause";
const server = express();
server.use(pause(1000));
server.use("/api", createAPIRoute());

server.listen(3001, () => {
	console.log("JSON Server is running");
});
