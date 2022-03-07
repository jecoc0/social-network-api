const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .populate({
      path: 'thoughtText',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
  },

  // get thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
    .populate({
      path: 'thoughtText',
      select: '-__v'
    })
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
  },


  // add thought
  addThought({ params, body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id }},
          { new: true }
        )
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this ID!'})
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },


  // remove thought
  removeThought({ params, body }, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(deletedThought => {
      if (! deletedThought) {
        return res.status(404).json({ message: 'No thoughts with this ID'})
      }
      res.json(deletedThought);
    })
    .catch(err => res.json(err));
  }, 

  // update thought
  updateThought({ params, body }, res) {
    Thought. findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    )
    .then(updatedThought => {
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thoughts with provided ID' });
      }
      res.json(updatedThought);
    })
    .catch(err => res.json(err));
  },


  // -----------------------------------REACTIONS 
  // add a reaction
  addReaction ({ params, body}, res) {
    console.log(params)
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: `No thoughts with provided ID` });
        return;
      }
      res.json(dbThoughtData)
    })
    .catch(err => res.json(err));
  },


  // remove reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { _id: params.reactionId }}},
      { new: true }
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController;