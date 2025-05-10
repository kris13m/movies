const express = require('express');
const router = express.Router();
const axios = require('axios');
const mysql = require('mysql2');
const authenticateJWT = require("../middleware/authMiddleware");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

// TJEK CORS PREFLIGHT OG PROTECTED ROUTES

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root', // or your local username
  password: 'root', // or your local password
  database: 'moviedb'
});

database.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.stack);
      return;
    }
    console.log('Connected to the database.');
  });
//api.com/api/users

  router.get('/', (req, res) => {
    const query = 'SELECT * FROM users';
  
    database.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query :( :', err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      res.json(results); 
    });
  });

  router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    database.query(query, [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Server error");
        }

        if (results.length === 0) {
            return res.status(401).send("Invalid username or password");
        }

        const user = results[0];

        // Compare password using bcrypt
        bcrypt.compare(password, user.passcode, (err, isMatch) => {
            if (err) {
                console.error("Error comparing password:", err);
                return res.status(500).send("Server error");
            }

            if (!isMatch) {
                return res.status(401).send("Invalid username or password");
            }

            // Generate JWT token
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET, { expiresIn: '15m' });

            // Set the cookie with token and specify the expiration (maxAge or expires)
           /* res.cookie('token', token, {
                httpOnly: false, // To prevent access to cookie via JavaScript
                secure: process.env.NODE_ENV === 'production', // Use only over HTTPS in production
                maxAge: 60*15*1000, // Cookie will expire in 1 hour (in milliseconds)
                sameSite: 'Strict' // Prevents the cookie from being sent with cross-site requests
            });*/

            return res.json({
                message: 'Login successful',
                AuthoToken:token,
                user: { id: user.id, username: user.username }
            });
        });
    });
});

    router.post('/register', (req, res) => {
        const { username, password } = req.body;
    
        // Validate input
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
    
        // Check if the username already exists
        checkUsernameExists(database, username, (err, exists) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
    
            if (exists) {
                return res.status(409).json({ error: "Username already taken" });
            }
    
            // Hash and salt the password
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    console.error("Hashing error:", err);
                    return res.status(500).json({ error: "Internal server error" });
                }
    
                // Insert new user
                const insertQuery = 'INSERT INTO users (username, passcode) VALUES (?, ?)';
                database.query(insertQuery, [username, hashedPassword], (err) => {
                    if (err) {
                        console.error("Insert error:", err);
                        return res.status(500).json({ error: "Error creating user" });
                    }
                    return res.status(201).json({ message: "User created successfully",
                        user: username
                     });
                });
            });
        });
    });
    
module.exports = router;