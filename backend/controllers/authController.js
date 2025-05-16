const authService = require('../services/authService');

async function register(req, res) {
  try {
    const { username, password, confirmPassword } = req.body;
    const user = await authService.registerUser(username, password, confirmPassword);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    if (error.message === 'Username is already taken') {
      return res.status(409).json({ error: error.message }); 
    }

    res.status(500).json({ error: 'Internal server error' }); 
  }
}

async function login(req, res) {
  console.log('Login attempt:', req.body);
  try {
    const { username, password } = req.body;
    const loginResult = await authService.loginUser(username, password);
    res.status(200).json(loginResult); // Contains user + token(s)
  } catch (error) {
    res.status(401).json({ error: error.message }); // Unauthorized
  }
}

async function logout(req, res) {
    try {
        const { username, password } = req.body;
        const result = await authService.logoutUser(username, password);
        res.json(result); // Send the result back to the client
    } catch (error) {
        res.status(401).json({ error: error.message }); // Handle errors
    }
}

module.exports = { login, register, logout };