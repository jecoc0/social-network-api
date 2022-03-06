const { User } = require('../models')

const userController = {
  // the functions will go in here as methods
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get user by ID
  getUserById({ params }, res) {
    User.findOne({_id: params.id })
      .then(dbUserData => {
        //if no user is found, send 404 error
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this ID'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },


// add friend


// update user by ID
updateUser({ params, body }, res) {
  User.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
},

// delete user
deleteUser({ params }, res) {
  User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No User found with this ID!'});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
}

};

module.exports = userController;