const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usersRepository = require('../repositories/usersRepository');
const { getCookieOptions } = require('../utils/cookieUtil');
const crypto = require('crypto');

const TOKEN_EXPIRATION = '1h';

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
}

// Helper: Set cookie with JWT
function setTokenCookie(res, token) {
  res.cookie('token', token, getCookieOptions());
}

// Helper: Clear cookie (e.g. on logout)
function clearTokenCookie(res) {
  const expiredOptions = { ...getCookieOptions(), maxAge: 0 };
  console.log("Logging out - clearing cookies");
  res.cookie('token', '', expiredOptions);
  res.cookie('csrf-token', '', expiredOptions); // Also clear CSRF token
}

// Service: Registration
async function registerUser(username, password, confirmPassword) {
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  const existing = await usersRepository.findUserByUsername(username);
  if (existing) {
    throw new Error('Username already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await usersRepository.createUser(username, hashedPassword);

  const token = generateToken(user.user_id);

  return { user, token };
}

// Service: Login
async function loginUser(username, password) {
  const user = await usersRepository.findUserByUsername(username);
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new Error('Invalid username or password');
  }

  const token = generateToken(user.user_id);

  return { user, token };
}

// Service: Verify token and fetch user
async function getUserFromToken(token) {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const user = await usersRepository.findUserById(payload.userId);
  if (!user) {
    throw new Error('User not found');
  }

  return {
    id: user.user_id,
    username: user.username,
    role: user.role
  };
}

function generateCsrfToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Attach CSRF cookie (non-HttpOnly so frontend can read it)
function setCsrfCookie(res, csrfToken) {
  res.cookie('csrf-token', csrfToken, {
    ...getCookieOptions(),
    httpOnly: false, // frontend needs to read it
    secure: process.env.SECURE === 'true',
    sameSite: process.env.SAMESITE || 'lax',
  });
}

module.exports = {
  registerUser,
  loginUser,
  getUserFromToken,
  setTokenCookie,
  clearTokenCookie,
  generateCsrfToken,
  setCsrfCookie
};