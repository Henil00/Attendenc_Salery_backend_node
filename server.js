require("dotenv").config();
const app = require("./app");
const { sequelize, syncDatabase } = require("./models");

const PORT = process.env.PORT || 8080;

// Root health check (basic)
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Attendance API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Database health check (shows if DB is connected)
app.get("/api/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      status: "OK",
      database: "Connected",
      timestamp: new Date().toISOString(),
      env: {
        nodeEnv: process.env.NODE_ENV || "development",
        databaseUrlSet: !!process.env.DATABASE_URL,
        databaseUrlHost: process.env.DATABASE_URL
          ? process.env.DATABASE_URL.split("@")[1]?.split("/")[0]
          : "NOT SET",
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      database: "Disconnected",
      error: err.message,
      timestamp: new Date().toISOString(),
      env: {
        nodeEnv: process.env.NODE_ENV || "development",
        databaseUrlSet: !!process.env.DATABASE_URL,
        databaseUrlHost: process.env.DATABASE_URL ? "Set (hidden)" : "NOT SET",
      },
    });
  }
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const start = async () => {
    try {
      await syncDatabase();
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/`);
        console.log(`DB health: http://localhost:${PORT}/api/health`);
      });
    } catch (err) {
      console.error("Failed to start server:", err);
      process.exit(1);
    }
  };
  start();
}

module.exports = app;
