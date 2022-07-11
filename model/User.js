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
    minlength: 5,
  },
  address: {
    type: String,
    trim: true,
    maxlength: 50,
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
  // return Promise
  return user.save()
}

const User = mongoose.model('User', userSchema)

module.exports = { User }