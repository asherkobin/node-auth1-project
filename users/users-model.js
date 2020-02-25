const DB = require("../database/dbConfig");

async function findAll() {
  return DB("users");
}

module.exports = {
  findAll
}