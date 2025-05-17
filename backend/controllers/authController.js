const authService = require('../services/authService');
const usersRepository = require('../repositories/usersRepository');
const jwt = require('jsonwebtoken');


async function register(req, res) {
  try {
    const { username, password, confirmPassword } = req.body;
    const { user, token } = await authService.registerUser(username, password, confirmPassword);

    
    res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.SECURE === 'true',     
  sameSite: process.env.SAMESITE || 'lax',
  maxAge: 60 * 60 * 1000,
  path: '/',
});

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const loginResult = await authService.loginUser(username, password);

   
   res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.SECURE === 'true',    
  sameSite: process.env.SAMESITE || 'lax',
  maxAge: 60 * 60 * 1000,
  path: '/',
});

    res.status(200).json({ user: loginResult.user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function logout(req, res) {
  console.log("in logout");
  res.cookie('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  res.status(200).json({ message: 'Logged out' });
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
module.exports = { login, register, logout, getSession };