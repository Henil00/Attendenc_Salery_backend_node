require("dotenv").config();
const app = require("./app");
const { syncDatabase } = require("./models");

const PORT = process.env.PORT || 8080;

// Health check endpoint (at root)
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Attendance API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const start = async () => {
    try {
      await syncDatabase();
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/`);
      });
    } catch (err) {
      console.error("Failed to start server:", err);
      process.exit(1);
    }
  };
  start();
}

// Export for Vercel (serverless)
module.exports = app;
