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
// Similar lines for thoughts and reactions routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
