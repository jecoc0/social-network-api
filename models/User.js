const { Schema, model } = require('mongoose');

const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, 'Please use a valid email address'],
    match: [/^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address']
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});


// create the User model using the UserSchema
const User = model('User', UserSchema);

// provide number of friends
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});


module.exports = User;