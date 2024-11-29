const express = require('express')
const router = express.Router()
const Student = require('..//models/user')
const Class = require('../models/class')

router.get('/', async (req, res) => {
  try {
    const mySubject = await Class.find({
      student: req.session.user._id
    })
      .populate('owner')
      .populate('teacher')
      .populate('subject')
    res.render('student/index.ejs', { mySubject })
  } catch (error) {
    console.log(error)
    res.redirect('/student')
  }
})

router.get('/new', async (req, res) => {
  try {
    const populatedClass = await Class.find({})
      .populate('teacher')
      .populate('subject')
    res.render('student/new.ejs', { Class: populatedClass })
  } catch (error) {
    console.log(error)
    res.redirect('/student')
  }
})

router.post('/:populatedClass/join-by/:userId', async (req, res) => {
  try {
    req.body.owner = req.session.user._id

    await Class.findByIdAndUpdate(req.params.populatedClass, {
      $push: { student: req.params.userId }
    })
    req.session.message = 'Class Add successfully'

    res.redirect('/student')
  } catch (error) {
    console.log(error)
    res.redirect('/student')
  }
})

module.exports = router
