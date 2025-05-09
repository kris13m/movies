const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Core middleware
app.use(express.json());
app.use(cookieParser());

const corsPolicy = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsPolicy));

// Health check
app.get('/', (req, res) => res.send('API online'));

// Bootstrapping everything else
const initializeApp = require('./config/initialize');

initializeApp(app).then(() => {
  app.listen(3000, () => console.log('API is running on http://localhost:3000'));
}).catch((err) => {
  console.error('Initialization error:', err);
  process.exit(1);
});