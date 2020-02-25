const authRouter = require("express").Router();
const usersModel = require("../users/users-model");
const { createHash, compareWithHash } = require("../utils/hash");

authRouter.get("/", (req, res) => {
  res.status(200).json("Auth Running...");
});

authRouter.post("/register", async (req, res) => {
  const userInfo = req.body;

  if (!userInfo.username || !userInfo.password) {
    res.status(400).json("[username] and [password] are required to register");
  }
  else {
    try {
      res.status(200).json(
        await usersModel.add({
          ...userInfo,
          password: createHash(userInfo.password)
        })
      );
    }
    catch (e) {
      if (e.code === "SQLITE_CONSTRAINT") {
        res.status(400).json("Registration Failed: User already exists");
      }
      else {
        res.status(500).json(e);
      }
    }
  }
});

authRouter.post("/login", async (req, res) => {
  const userInfo = req.body;

  if (!userInfo.username || !userInfo.password) {
    res.status(400).json("[username] and [password] are required to login");
  }
  else {
    try {
      const { password } = await usersModel.findByUsername(userInfo.username);
      
      if (compareWithHash(userInfo.password, password)) {
        res.status(200).json("Logged In");
      }
      else {
        res.status(401).json("Not Authorized");
      }
    }
    catch (e) {
      res.status(500).json(e.toString());
    }
  }
});

module.exports = authRouter;