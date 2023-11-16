const { Thought } = require('../models');

const reactionsController = {
  createReaction: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;

      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $push: {
            reactions: { reactionBody, username },
          },
        },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (error) {
      console.error('Error in createReaction:', error);
      res.status(500).json({ error: 'Failed to create reaction', details: error.message });
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;

      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $pull: {
            reactions: { _id: reactionId },
          },
        },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (error) {
      console.error('Error in deleteReaction:', error);
      res.status(500).json({ error: 'Failed to delete reaction', details: error.message });
    }
  },
};

module.exports = reactionsController;
