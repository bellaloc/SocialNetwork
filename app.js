const express = require('express');
const mongoose = require('mongoose');
const { sequelize } = require('./config/connection');
const routes = require('./routes');

// Import additional routes
const usersRouter = require('./routes/api/users');
const thoughtsRouter = require('./routes/api/thoughts');
const reactionsRouter = require('./routes/api/reactions');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define API routes
app.use('/api/users', usersRouter);
app.use('/api/thoughts', thoughtsRouter);
app.use('/api/reactions', reactionsRouter);

// Default route
app.use(routes);

// MongoDB connection
mongoose.connect('mongodb:/localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// // Sequelize sync and start the server
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });
// });
