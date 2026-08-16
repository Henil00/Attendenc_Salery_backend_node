module.exports = (err, req, res, next) => {
  const status = err.status || 500;

  // Log the full error to Vercel logs
  console.error("ERROR:", {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    status: status,
  });

  res.status(status).json({
    message: err.message || "An unexpected error occurred",
    status: status,
    timestamp: new Date().toISOString(),
    path: req.url,
  });
};
