// models/thought.js

const mongoose = require('mongoose');


// Thought schema definition
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
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    //   get: (createdAt) => dateFormat(createdAt),
    // },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual field to get the reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Virtual field to format createdAt
thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt;
});

// Pre-hook to populate reactions before finding a thought
thoughtSchema.pre('findOne', function () {
  this.populate('reactions');
});

// Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
