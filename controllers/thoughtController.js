const { User, Thought } = require("../models");

// Thought Controller
const thoughtController = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      return res.status(200).json(thoughts);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async getThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      return res.status(200).json(thought);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      await User.findByIdAndUpdate(
        req.body.userId,
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true }
      );

      return res.status(201).json({ thought });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this ID" });
      }

      return res.status(200).json(thought);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      return res
        .status(200)
        .json({ message: "Thought & associated reactions deleted" });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async modifyReactionList(req, res, modifier) {
    try {
      const reaction = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        modifier,
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      return res.status(200).json(reaction);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    return thoughtController.modifyReactionList(req, res, {
      $addToSet: { reactions: req.body },
    });
  },

  async deleteReaction(req, res) {
    return thoughtController.modifyReactionList(req, res, {
      $pull: { reactions: { _id: req.params.reactionId } },
    });
  },
};

module.exports = thoughtController;
