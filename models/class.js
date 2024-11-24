const mongoose = require('mongoose')

const classSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    subject: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject'
      }
    ],
    time: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      require: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    student: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true //means created At and update At
  }
)

const Class = mongoose.model('Class', classSchema)

module.exports = Class
