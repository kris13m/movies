const usersRepository = require('../repositories/usersRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const { login } = require('../controllers/authController');

async function registerUser(username, plainPassword, confirmPassword) {
  if (plainPassword !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  const existingUser = await usersRepository.findUserByUsername(username);
  if (existingUser) {
    throw new Error('Username is already taken');
  }

  const passwordHash = await bcrypt.hash(plainPassword, 10);
  const newUser = await usersRepository.createUser(username, passwordHash);

  // Build token payload and sign
  const token = jwt.sign(
    { userId: newUser.user_id, username: newUser.username, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  console.log(token);

  return {
    user: {
      id: newUser.user_id,
      username: newUser.username,
      role: newUser.role
    },
    token
  };
}

async function loginUser(username, password) {

  const user = await usersRepository.findUserByUsername(username);
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign(
    { userId: user.user_id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  

  return {
    user: { id: user.user_id, username: user.username, role: user.role },
    token
  };
}
module.exports = { registerUser, loginUser };