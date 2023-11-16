// routes/api/users.js
const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/usersController');

// Routes for users
router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Routes for friends
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
