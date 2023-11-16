
const mongoose = require('mongoose');
const db = require('../models');
const usersData = require('./userSeeds'); 

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    await db.User.deleteMany({});
    await db.User.create(usersData);

    console.log('Seed data inserted successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
