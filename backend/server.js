const express = require('express');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Core middleware
app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
      },
    },
  })
);

const corsPolicy = {
  origin: process.env.CORS_ORIGIN,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsPolicy));

// Health check
app.get('/', (req, res) => {
  res.send('API is running');
});


const initializeApp = require('./config/initialize');

initializeApp(app).then(() => {
  app.listen(3000, () => console.log('API is running on http://localhost:'+PORT || 3000));
}).catch((err) => {
  console.error('Initialization error:', err);
  process.exit(1);
});