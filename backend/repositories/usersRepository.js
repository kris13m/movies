const User = require("../models/User");

async function createUser(username, passwordHash) {
    return await User.create({ username, password_hash: passwordHash });
  }

async function findUserByUsername(username) {
    return await User.findOne({ where: { username } });
  }

async function findUserById(userId) {
    return await User.findByPk(userId);
  }

const deleteUserById = async (id) => {
  const numberOfRowsDeleted = await User.destroy({
    where: {
      user_id: id 
    }
  });
  return numberOfRowsDeleted;
};


module.exports = { findUserByUsername, createUser, findUserById, deleteUserById };