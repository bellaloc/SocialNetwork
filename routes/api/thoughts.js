// routes/api/thoughts.js

const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtsController');

// Route for getting all thoughts
router.get('/', getAllThoughts);

// Route for getting a single thought by its _id
router.get('/:thoughtId', getThoughtById);

// Route for creating a new thought
router.post('/', createThought);

// Route for updating a thought by its _id
router.put('/:thoughtId', updateThought);

// Route for deleting a thought by its _id
router.delete('/:thoughtId', deleteThought);

module.exports = router;
