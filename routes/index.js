// routes/index.js

const router = require('express').Router();
const apiRoutes = require('./api');
const authRoutes = require('./auth'); // Routes for user authentication
const userRoutes = require('./users'); // Routes for user registration and profile
const homeRoutes = require('./home'); // Routes for the homepage

// API routes
router.use('/api', apiRoutes);

// Additional routes
router.use('/auth', authRoutes); // User authentication routes
router.use('/users', userRoutes); // User registration and profile routes
router.use('/', homeRoutes); // Homepage routes

module.exports = router;
