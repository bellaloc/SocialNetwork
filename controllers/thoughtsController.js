const { Thought, User } = require('../models');

const thoughtsController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);
    } catch (error) {
      console.error('Error in getAllThoughts:', error);
      res.status(500).json({ error: 'Failed to get all thoughts', details: error.message });
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const thought = await Thought.findOne({ _id: thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (error) {
      console.error('Error in getThoughtById:', error);
      res.status(500).json({ error: 'Failed to get thought by ID', details: error.message });
    }
  },

  createThought: async (req, res) => {
    try {
      const { thoughtText, username, userId } = req.body;

      const thought = await Thought.create({ thoughtText, username });

      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.json(thought);
    } catch (error) {
      console.error('Error in createThought:', error);
      res.status(500).json({ error: 'Failed to create thought', details: error.message });
    }
  },

  updateThought: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { thoughtText } = req.body;

      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { thoughtText },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (error) {
      console.error('Error in updateThought:', error);
      res.status(500).json({ error: 'Failed to update thought', details: error.message });
    }
  },

  deleteThought: async (req, res) => {
    try {
      const { thoughtId } = req.params;

      const thought = await Thought.findOneAndRemove({ _id: thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      await User.findOneAndUpdate(
        { thoughts: thoughtId },
        { $pull: { thoughts: thoughtId } },
        { new: true }
      );

      res.json(thought);
    } catch (error) {
      console.error('Error in deleteThought:', error);
      res.status(500).json({ error: 'Failed to delete thought', details: error.message });
    }
  },
};

module.exports = thoughtsController;
