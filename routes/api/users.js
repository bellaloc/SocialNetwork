const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/usersController');
const userController = require('../../controllers/usersController');

// Route for getting all users and creating a new user
  router.get('/', userController.getAllUsers);
  router.get('/', userController.createUser);
  router.get('/', userController.getUserById);
  router.get('/', userController.updateUser);
  router.get('/', userController.deleteUser);
  
// Route for getting a single user by their _id, updating a user, and deleting a user
router.route('/:userId')
  .get(getUserById)
  .get(getAllUsers)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
