const express = require('express')
const router = express.Router()
const Admin = require('..//models/user')

router.get('/', async (req, res) => {
  try {
    // const populatedIngredient = await Ingredient.find({}).populate('owner')
    // console.log('Populated ingredient:', populatedIngredient)
    // res.render('ingredients/index.ejs', { Ingredient: populatedIngredient })
    res.render('admin/index.ejs')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

// exports.index = async (req, res) => {
//   try {
//     // const populatedAdmin = await Admin.find({}).populate('owner')
//     // console.log('Populated Admin: ', populatedAdmin)
//     // res.render('admin/newClass.ejs', { admin: populatedAdmin })
//     res.render('admin/newClass.ejs')
//   } catch (error) {
//     console.log(err)
//     res.redirect('/')
//   }
// }

// exports.userIndex = async (req, res) => {
//   try {
//     res.render('admin/userIndex.ejs')
//   } catch (error) {
//     console.log(err)
//     res.redirect('/')
//   }
// }

// exports.create = async (req, res) => {
//   req.body.owner = req.session.user._id
//   await Class.create(req.body)
//   res.redirect('/admin')
// }

module.exports = router
