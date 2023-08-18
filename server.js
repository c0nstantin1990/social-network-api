const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Set the port for the server to listen on
const PORT = process.env.PORT || 3001;

// Create an Express application
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Database connection callback
db.once("open", () => {
  // Start the server to listen on the specified port
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
