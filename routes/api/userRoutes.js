const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

// Routes for /api/users
router.route("/").get(getUsers).post(createUser);

// Routes for /api/users/:userId
router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

// Routes for /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
