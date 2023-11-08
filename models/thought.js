const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => dateFormat(createdAt),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt;
});

thoughtSchema.pre('findOne', function () {
  this.populate('reactions');
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
