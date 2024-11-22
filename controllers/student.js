const express = require('express')
const router = express.Router()
const Student = require('..//models/user')

router.get('/', async (req, res) => {
  try {
    // const populatedIngredient = await Ingredient.find({}).populate('owner')
    // console.log('Populated ingredient:', populatedIngredient)
    // res.render('ingredients/index.ejs', { Ingredient: populatedIngredient })
    res.render('student/index.ejs')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

module.exports = router
