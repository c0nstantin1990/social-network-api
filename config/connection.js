const { connect, connection } = require("mongoose");

// Creating database
const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialDB";

// Connects Mongoose and MongoDB
connect(connectionString);

module.exports = connection;
