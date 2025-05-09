const usersRepository = require('../repositories/usersRepository');
const bcrypt = require('bcrypt');

async function registerUser(username, plainPassword, confirmPassword) {

  

  if (plainPassword !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  if(plainPassword.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
  if(plainPassword.length > 20){
    throw new Error('Password must be at most 20 characters long');
  }

  const existingUser = await usersRepository.findUserByUsername(username);
  if (existingUser) {
    throw new Error('Username is already taken');
  }

  const passwordHash = await bcrypt.hash(plainPassword, 10);
  const newUser = await usersRepository.createUser(username, passwordHash);
  return newUser;
}
module.exports = { registerUser };