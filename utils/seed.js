const { User } = require("../models");
require("mongoose");

const connection = require("../config/connection");
// Seed data
const users = [
  {
    username: "Ryan",
    email: "ryan@gmail.com",
    thoughts: [],
  },
  {
    username: "Emma",
    email: "emma@example.com",
    thoughts: [],
  },
  {
    username: "Alex",
    email: "alex@test.com",
    thoughts: [],
  },
];

// Log the database connection details
console.log(connection);

// Connects to the database
connection.once("open", async () => {
  console.log("Connected to the database");

  // Delete existing users
  await User.deleteMany({});

  // Add seed data to the database
  await User.collection.insertMany(users);

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
