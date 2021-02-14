const bcrypt = require("bcrypt");

function createHash(data) {
  return bcrypt.hashSync(data, 8);
}

function compareWithHash(data, hash) {
  console.log("data", data)
  console.log("hash", hash)
  return bcrypt.compareSync(data, hash);
}

module.exports = {
  createHash,
  compareWithHash
}