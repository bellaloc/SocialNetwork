const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const usersRouter = require('./routes/api/users');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define API routes
app.use('/api/user', usersRouter);
app.use(routes);

// MongoDB connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Sequelize sync and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
