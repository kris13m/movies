

/*
async function register(req, res) {
  try {
    const { username, password, confirmPassword } = req.body;
    const { user, token } = await authService.registerUser(username, password, confirmPassword);

    
   res.cookie('token', token, getCookieOptions());
return res.status(201).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const { user, token } = await authService.loginUser(username, password); 

    res.cookie('token', token, getCookieOptions());
return res.status(200).json({ user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function logout(req, res) {
  console.log("in logout");
  const logoutOptions = {
  ...getCookieOptions(),
  maxAge: 0,
};

res.cookie('token', '', logoutOptions);
return res.status(200).json({ message: 'Logged out' });
}

async function getSession(req, res) {
  try {

    const token = req.cookies.token;
    

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Payload from token:', payload);

    const user = await usersRepository.findUserById(payload.userId);
    console.log('User fetched from DB:', user);

    if (!user) {
      console.log('User not found for id:', payload.userId);
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: { id: user.user_id, username: user.username, role: user.role }
    });

  } catch (err) {
    console.error('Error in getSession:', err);
    res.status(401).json({ error: 'Invalid session' });
  }
}

*/

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