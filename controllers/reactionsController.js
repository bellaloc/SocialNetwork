// controllers/reactionsController.js

const { Thought } = require('../models');

const reactionsController = {
  // Create a new reaction for a thought
  createReaction(req, res) {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    Thought.findOneAndUpdate(
      { _id: thoughtId },
      {
        $push: {
          reactions: { reactionBody, username },
        },
      },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a reaction from a thought
  deleteReaction(req, res) {
    const { thoughtId, reactionId } = req.params;

    Thought.findOneAndUpdate(
      { _id: thoughtId },
      {
        $pull: {
          reactions: { _id: reactionId },
        },
      },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = reactionsController;
