const Student = require('..//models/user')

exports.index = async (req, res) => {
  try {
    res.render('student/index.ejs')
  } catch (error) {
    console.log(err)
    res.redirect('/')
  }
}
