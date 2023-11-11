const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/usersController');



// Get all users and create a new user
router.route('/')
  .get(getAllUsers)
  .post(createUser);

// Get a single user by their ID, update a user, and delete a user
router.route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
