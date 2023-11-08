const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => dateFormat(createdAt),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Function to format the timestamp (you may need to define dateFormat)
reactionSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt;
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
