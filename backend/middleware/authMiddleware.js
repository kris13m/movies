const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

const authValidate = (req, res, next) => {
  
  const token = req.cookies?.token; 

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;
    next();
  });
};

module.exports = authValidate;