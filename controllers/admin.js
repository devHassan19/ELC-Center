const express = require('express')
const router = express.Router()
const Admin = require('..//models/user')
const Subject = require('../models/subject')
const Class = require('../models/class')

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
router.get('/class', async (req, res) => {
  try {
    const teachers = await Admin.find({ userType: 'teacher' })
    const populateClass = await Class.find({})
    const subject = await Subject.find({})
    res.render('admin/class.ejs', { subject, populateClass, teachers })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/newClass', async (req, res) => {
  const teachers = await Admin.find({ userType: 'teacher' })

  const subject = await Subject.find({})
  res.render('admin/newClass.ejs', { subject, teachers })
})

router.post('/', async (req, res) => {
  await Class.create(req.body)
  res.redirect('/admin/class')
})

router.get('/class', async (req, res) => {
  try {
    const teachers = await Admin.find({ userType: 'teacher' })
    const populateClass = await Class.find({})
    const subject = await Subject.find({})
    res.render('admin/class', { subject, populateClass, teachers })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.delete('/:classId', async (req, res) => {
  try {
    const populateClass = await Class.findById(req.params.classId)

    await Class.deleteOne()
    res.redirect('/admin/class')
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

module.exports = router
