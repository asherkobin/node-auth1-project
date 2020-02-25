const usersRouter = require("express").Router();
const usersModel = require("../users/users-model");

usersRouter.get("/", async (req, res) => {
  const users = await usersModel.findAll();
  
  res.status(200).json(users);
});

module.exports = usersRouter;