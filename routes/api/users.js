const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/usersController');

// Route for getting all users and creating a new user
router.route('/')
  .get(getAllUsers)
  .post(createUser);

// Route for getting a single user by their _id, updating a user, and deleting a user
router.route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
