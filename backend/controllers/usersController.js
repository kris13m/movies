const userService = require('../services/usersService');

async function register(req, res) {
  const { username, password } = req.body;

  try {
    const user = await userService.registerUser(username, password);
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}