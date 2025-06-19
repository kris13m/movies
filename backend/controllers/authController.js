const authService = require('../services/authService');
const usersRepository = require('../repositories/usersRepository');
const jwt = require('jsonwebtoken');
const { getCookieOptions} = require('../utils/cookieUtil');


async function login(req, res) {
  try {
    const { username, password } = req.body;
    const { user, token } = await authService.loginUser(username, password);

    // Set JWT cookie
    authService.setTokenCookie(res, token);

    // Generate & set CSRF token
    const csrfToken = authService.generateCsrfToken();
    authService.setCsrfCookie(res, csrfToken);

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

// REGISTER
async function register(req, res) {
  try {
    const { username, password, confirmPassword } = req.body;
    const { user, token } = await authService.registerUser(username, password, confirmPassword);

    // Set JWT cookie
    authService.setTokenCookie(res, token);

    // Generate & set CSRF token
    const csrfToken = authService.generateCsrfToken();
    authService.setCsrfCookie(res, csrfToken);

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function logout(req, res) {
  authService.clearTokenCookie(res);
  return res.status(200).json({ message: 'Logged out' });
}

async function getSession(req, res) {
  try {
    const user = await authService.getUserFromToken(req.cookies.token);
    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid session' });
  }
}

module.exports = { login, register, logout, getSession };

