const mapRoutes = require('./mapRoutes');

module.exports = async function initializeApp(app) {
  console.log('Initializing app...');
  mapRoutes(app);
};