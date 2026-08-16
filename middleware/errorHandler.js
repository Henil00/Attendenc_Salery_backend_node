module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'An unexpected error occurred',
    status: status,
    timestamp: new Date().toISOString()
  });
};