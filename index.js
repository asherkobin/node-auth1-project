const express = require("express");
const server = express();
const portNum = process.env.PORT || 5000;
const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");

server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.listen(portNum, () => {
  console.log("Express is Running on " + portNum);
});