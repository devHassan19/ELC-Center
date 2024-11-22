const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true //means created At and update At
  }
)

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject
