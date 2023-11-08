const { User } = require('../models');

const usersController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v') // Exclude the __v field from the response
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single user by their _id and populate thought and friend data
  getUserById(req, res) {
    const { userId } = req.params;
    User.findOne({ _id: userId })
      .select('-__v')
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a new user
  createUser(req, res) {
    const { username, email } = req.body;
    User.create({ username, email })
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  // Update a user by their _id
  updateUser(req, res) {
    const { userId } = req.params;
    const { username, email } = req.body;

    User.findOneAndUpdate({ _id: userId }, { username, email }, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a user by their _id
  deleteUser(req, res) {
    const { userId } = req.params;

    User.findOneAndRemove({ _id: userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        // Remove the user from the friends list of all other users
        User.updateMany({ friends: userId }, { $pull: { friends: userId } })
          .then(() => {
            // Remove all thoughts associated with the user (Bonus Task)
            return Thought.deleteMany({ _id: { $in: user.thoughts } });
          })
          .then(() => res.json(user))
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = usersController;
