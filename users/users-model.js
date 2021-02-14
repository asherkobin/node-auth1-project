const DB = require("../database/dbConfig");

async function findAll() {
  return DB("users");
}

async function findById(id) {
  return DB("users")
    .select("id", "username")
    .where("id", id)
    .first();
}

async function findByUsername(username) {
  return DB("users")
    .where("username", username)
    .first();
}

async function add(userInfo) {
  const [id] = await DB("users").insert(userInfo);

  return findById(id);
}

module.exports = {
  findAll,
  findById,
  findByUsername,
  add
}