const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: false,
  // useFindAndModify: false,
});

//mongoose.set('strictQuery', true);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
});
