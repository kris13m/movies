const express = require('express');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

const corsPolicy = {
  origin: process.env.CORS_ORIGIN,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.options('*', cors(corsPolicy));
app.use(cors(corsPolicy));

const initializeApp = require('./config/initialize');

initializeApp(app)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Initialization error:', err);
    process.exit(1);
  });