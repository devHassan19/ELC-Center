const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [3, 'Name must to more 3 letter']
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    userType: {
      type: String,
      required: true,
      enum: ['admin', 'student']
    }
  },
  {
    timestamps: true //means created At and update At
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
