const router = require('express').Router();
const { addThought, removeThought, getAllThoughts, getThoughtById, updateThought, addReaction, removeReaction 
} = require('../../controllers/thought-controller')


router
  .route('/')
  .get(getAllThoughts)
  .post(addThought)

router
  .route('/:id')
  .get(getThoughtById)
  .delete(removeThought)
  .put(updateThought)

router
  .route('/:thoughtId/reactions')
  .post(addReaction)

router
  .route('/:thoughtId/:reactionId')
  .delete(removeReaction)


module.exports = router;