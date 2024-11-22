const express = require('express')
const router = express.Router()
const Teacher = require('../models/user')
const Subject = require('../models/subject')

router.get('/', async (req, res) => {
  try {
    const populatedSubject = await Subject.find({}).populate('owner')
    console.log('Populated subject:', populatedSubject)
    // const currentSubject = await Subject.findById(req.params.subjectId)
    // if (currentSubject.owner.equals(req.session.user._id))
    res.render('teacher/index.ejs', { Subject: populatedSubject })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/new', async (req, res) => {
  res.render('teacher/new.ejs')
})

router.post('/', async (req, res) => {
  req.body.owner = req.session.user._id
  await Subject.create(req.body)
  res.redirect('/teacher')
})

router.get('/:subjectId', async (req, res) => {
  try {
    const populatedSubject = await Subject.findById(
      req.params.subjectId
    ).populate('owner')
    res.render('teacher/show.ejs', {
      Subject: populatedSubject
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/:subjectId/edit', async (req, res) => {
  try {
    const currentSubject = await Subject.findById(req.params.subjectId)
    res.render('teacher/edit.ejs', {
      Subject: currentSubject
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/:subjectId', async (req, res) => {
  try {
    const currentSubject = await Subject.findById(req.params.subjectId)
    if (currentSubject.owner.equals(req.session.user._id)) {
      await currentSubject.updateOne(req.body)
      res.redirect('/teacher')
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.delete('/:subjectId', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.subjectId)
    if (subject.owner.equals(req.session.user._id)) {
      await Subject.deleteOne()
      res.redirect('/teacher')
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

module.exports = router
