exports.notFound = (req, res, next) => {
  res.redirect(`${process.env.CLIENT_URL}/404`);
};

exports.errorHandler = (err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
};
