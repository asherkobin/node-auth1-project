const restrictedRouter = require("express").Router();

restrictedRouter.get("/", async (req, res) => {
  res.status(200).json("Super User");
});

restrictedRouter.get("/secret1", async (req, res) => {
  res.status(200).json("You Can See ONE Secret");
});

restrictedRouter.get("/secret2", async (req, res) => {
  res.status(200).json("You Can See TWO Secrets");
});

module.exports = restrictedRouter;