// routes/api/reactions.js

const router = require('express').Router();
const {
  createReaction,
  deleteReaction,
} = require('../../controllers/reactionsController');

// Route for creating a reaction for a thought
router.post('/:thoughtId/reactions', createReaction);

// Route for deleting a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
