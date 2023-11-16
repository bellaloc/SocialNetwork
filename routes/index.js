const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');
const userRoutes = require('./api/users');
const thoughtRoutes = require('./api/thoughts');
const reactionRoutes = require('./api/reactions');

// API routes
router.use('/api', apiRoutes);

// Additional routes
router.use('/users', userRoutes); // User routes
router.use('/thoughts', thoughtRoutes); // Thought routes
router.use('/reactions', reactionRoutes); // Reaction routes

module.exports = router;
