const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  // Additional fields you may want to include
  // For example, you can add a "password" field for authentication
  password: {
    type: String,
    required: true,
  },
  // You can also include a "createdAt" field to track the user's registration date
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
