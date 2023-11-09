const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware setup
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// API routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/thoughts', require('./routes/api/thoughts'));
app.use('/api/reactions', require('./routes/api/reactions'));

// Include routes for authentication and home
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');

app.use('/auth', authRoutes);
app.use('/', homeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
