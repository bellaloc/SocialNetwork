const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat'); // Make sure to define the dateFormat function

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual field for the reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return dateFormat(this.createdAt); // Use the dateFormat function to format the timestamp
});

thoughtSchema.pre('findOne', function () {
  this.populate('reactions');
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
