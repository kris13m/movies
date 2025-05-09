const authService = require('../services/authService');

async function register(req, res) {
    try {
        const { username, password, confirmPassword } = req.body;
        const result = await authService.registerUser(username, password, confirmPassword);
        res.json(result); // Send the result back to the client
    } catch (error) {
        res.status(401).json({ error: error.message }); // Handle errors
    }
}


async function login(req, res) {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        res.json(result); // Send the result back to the client
    } catch (error) {
        res.status(401).json({ error: error.message }); // Handle errors
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