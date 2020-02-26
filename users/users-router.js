const usersRouter = require("express").Router();
const usersModel = require("../users/users-model");

usersRouter.get("/", async (req, res) => {
  let users = await usersModel.findAll();

  users = users.map(u => {
     return { id: u.id, username: u.username }
  });
  
  res.status(200).json(users);
});

module.exports = usersRouter;