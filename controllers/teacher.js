const Teacher = require('..//models/user')

exports.index = async (req, res) => {
  try {
    res.render('teacher/index.ejs')
  } catch (error) {
    console.log(err)
    res.redirect('/')
  }
}
