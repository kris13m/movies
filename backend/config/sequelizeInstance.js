const { Sequelize } = require('sequelize');

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME || 'my_database', // Database name
  process.env.DB_USER || 'root',        // Username
  process.env.DB_PASSWORD || 'root',    // Password
  {
    host: process.env.DB_HOST || 'localhost', // Host
    dialect: 'mysql',                       
    logging: false,                         
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database via Sequelize');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

module.exports = sequelize;