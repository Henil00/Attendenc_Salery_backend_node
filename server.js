require('dotenv').config();
const app = require('./app');
const { syncDatabase } = require('./models');
const serverless = require('serverless-http');

// Sync database (Vercel will run this cold start)
let dbInitialized = false;
const initDb = async () => {
  if (!dbInitialized) {
    await syncDatabase();
    dbInitialized = true;
  }
};

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  initDb().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

// Export handler for Vercel
module.exports = async (req, res) => {
  await initDb();
  return serverless(app)(req, res);
};