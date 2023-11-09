// models/reaction.js

const mongoose = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

// Reaction schema definition
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
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    //   get: (createdAt) => dateFormat(createdAt), // Utilize the dateFormat function
    //},
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Virtual field to format createdAt
reactionSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt;
});

// Reaction model
const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
