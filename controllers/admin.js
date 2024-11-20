const Admin = require('..//models/user')

exports.index = async (req, res) => {
  try {
    // const populatedAdmin = await Admin.find({}).populate('admin')
    // console.log('Populated Admin: ', populatedAdmin)
    // res.render('admin/index.ejs', { theAdmin: populatedAdmin })
    res.render('admin/index.ejs')
  } catch (error) {
    console.log(err)
    res.redirect('/')
  }
}
