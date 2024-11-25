const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true //means created At and update At
  }
)

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject
