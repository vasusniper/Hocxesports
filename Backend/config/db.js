const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 10
  });

  return conn;
};

module.exports = { connectDB };