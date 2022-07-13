const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  id: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    maxlength: 50,
  },
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    minlength: 1,
  },
  chain: {
    type: String,
    trim: true,
    minlength: 1,
  },
  address: {
    type: String,
    trim: true,
    minlength: 10,
  },
  nftCount: {
    type: Number,
    default: 0,
  },
  datetime: {
    type: Date,
  },
})

userSchema.statics.create = function (payload) {
  // this === Model
  const user = new this(payload)
  user.datetime = new Date();
  // return Promise
  return user.save();
}

// Find All
userSchema.statics.findAll = function () {
  return this.find({}).select('-_id -__v');
}

// Find by Id
userSchema.statics.findOneById = function (id) {
  return this.findOne({ id });
}

const User = mongoose.model('User', userSchema);

module.exports = { User }