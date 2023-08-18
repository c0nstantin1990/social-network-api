const { User, Thought } = require("../models");

// User Controller
const userController = {
  async getUsers(req, res) {
    try {
      const users = await User.find()
        .populate("thoughts friends", "-__v")
        .lean();

      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async getUser(req, res) {
    try {
      const user = await User.findById(req.params.userId)
        .populate("thoughts friends", "-__v")
        .lean();

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      return res.status(201).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $set: req.body },
        { runValidators: true, new: true }
      ).lean();

      if (!user) {
        return res.status(404).json({ message: "No user with this ID" });
      }

      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId).lean();

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      return res
        .status(200)
        .json({ message: "User and associated data deleted" });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async modifyFriendList(req, res, modifier) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, modifier, {
        runValidators: true,
        new: true,
      }).lean();

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      return res.status(200).json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    return userController.modifyFriendList(req, res, {
      $addToSet: { friends: req.params.friendId },
    });
  },

  async deleteFriend(req, res) {
    return userController.modifyFriendList(req, res, {
      $pull: { friends: req.params.friendId },
    });
  },
};

module.exports = userController;
