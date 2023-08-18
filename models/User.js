const { Schema, model } = require("mongoose");

// Define the user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    toJSON: { virtuals: true },
    id: false,
  }
);

// Define a virtual property 'friendCount'
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create User model using userSchema
const User = model("user", userSchema);

module.exports = User;
