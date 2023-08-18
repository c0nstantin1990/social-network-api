const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Define the thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

// Define a virtual property 'reactionCount'
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create Thought model using thoughtSchema
const Thought = model("thought", thoughtSchema);

// Export the Thought model
module.exports = Thought;
