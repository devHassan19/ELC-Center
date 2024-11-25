const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema(
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

const Teacher = mongoose.model('Teacher', teacherSchema)

module.exports = Teacher
