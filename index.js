const express = require("express");
const server = express();
const portNum = process.env.PORT || 5000;
const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");
const restrictedRouter = require("./restricted/restricted-router.js");
const session = require("express-session");
const KnexStore = require("connect-session-knex")(session);
const restrictedBySession = require('./auth/session-mw.js');

const sessionConfig = {
  name: "session",
  secret: "secret phrase",
  resave: false,
  saveUninitialized: true, // GDPR
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 minutes
    secure: false, // true in prod (https)
    httpOnly: true, // JS cannot access cookie
  },
  store: new KnexStore({
    knex: require("./database/dbConfig"),
    tablename: "sessions",
    createtable: true,
    sidfieldname: "sid",
    clearInterval: 1000 * 60 * 10, // 10 minutes
  })
};

server.use(express.json());
server.use(session(sessionConfig));

server.use("/api/auth", authRouter);
server.use("/api/users", restrictedBySession, usersRouter);
server.use("/api/restricted", restrictedBySession, restrictedRouter);

server.listen(portNum, () => {
  console.log("Express is Running on " + portNum);
});