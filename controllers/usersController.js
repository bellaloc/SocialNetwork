const db = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await db.find();
      res.json({ users });
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      res.status(500).json({ error: 'Failed to get all users', details: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await db.User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ user });
    } catch (error) {
      console.error('Error in getUserById:', error);
      res.status(500).json({ error: 'Failed to get user by ID', details: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password fields are required' });
      }

      const existingUser = await db.User.findOne({ where: { username } });

      if (existingUser) {
        return res.status(400).json({ error: 'Username is already taken' });
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await db.User.create({ username, email, password: hashedPassword });

      req.session.userId = user.id;

      res.status(201).json({ user });
    } catch (error) {
      console.error('Error in createUser:', error);
      res.status(500).json({ error: 'Failed to create user', details: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { username, email, password } = req.body;

      const user = await db.User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.username = username || user.username;
      user.email = email || user.email;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
      }

      await user.save();

      res.json({ user });
    } catch (error) {
      console.error('Error in updateUser:', error);
      res.status(500).json({ error: 'Failed to update user', details: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await db.User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();

      res.status(204).end();
    } catch (error) {
      console.error('Error in deleteUser:', error);
      res.status(500).json({ error: 'Failed to delete user', details: error.message });
    }
  },
};

module.exports = userController;
