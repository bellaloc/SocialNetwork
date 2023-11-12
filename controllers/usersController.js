const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.json({ users });
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ error: 'Failed to get all users', details: error.message });
  }
};

const getUserById = async (req, res) => {
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
};

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password fields are required' });
    }

    const existingUser = await db.User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await db.User.create({ username, password: hashedPassword });

    req.session.userId = user.id;

    res.status(201).json({ user });
  } catch (error) {
    console.error('Error in createUser:', error);
    res.status(500).json({ error: 'Failed to create user', details: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { username, password } = req.body;

    const user = await db.User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.username = username || user.username;
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
};

const deleteUser = async (req, res) => {
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
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
