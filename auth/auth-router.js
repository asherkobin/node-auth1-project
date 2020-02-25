const authRouter = require("express").Router();
const usersModel = require("../users/users-model");

authRouter.get("/", (req, res) => {
  res.status(200).json("Auth Running...");
});

module.exports = authRouter;