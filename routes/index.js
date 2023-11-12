const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');

// API routes
router.use('/api', apiRoutes);

// Additional routes
// router.use('/auth', authRoutes); // User authentication routes
// router.use('/users', userRoutes); // User registration and profile routes
// router.use('/', homeRoutes); // Homepage routes

module.exports = router;


