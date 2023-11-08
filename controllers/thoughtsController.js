const { Thought, User } = require('../routes');

const thoughtsController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought by its _id
  getThoughtById(req, res) {
    const { thoughtId } = req.params;
    Thought.findOne({ _id: thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought
  createThought(req, res) {
    const { thoughtText, username, userId } = req.body;
    Thought.create({ thoughtText, username })
      .then((thought) => {
        User.findOneAndUpdate(
          { _id: userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        )
          .then(() => res.json(thought))
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought by its _id
  updateThought(req, res) {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;

    Thought.findOneAndUpdate({ _id: thoughtId }, { thoughtText }, { new: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought by its _id
  deleteThought(req, res) {
    const { thoughtId } = req.params;

    Thought.findOneAndRemove({ _id: thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        // Remove the thought's _id from the associated user's thoughts array
        User.findOneAndUpdate(
          { thoughts: thoughtId },
          { $pull: { thoughts: thoughtId } },
          { new: true }
        )
          .then(() => res.json(thought))
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtsController;
