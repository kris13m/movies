const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded; // Attach user payload to request
        next(); // Proceed to next middleware or route
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
};

module.exports = authenticateJWT;