const express = require('express')
const router = express.Router()
const Admin = require('..//models/user')
const Subject = require('../models/subject')
const Class = require('../models/class')

router.get('/', async (req, res) => {
  try {
    res.render('admin/index.ejs')
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

// -------------Class section -------------------
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

router.get('/:classId/edit', async (req, res) => {
  try {
    const teachers = await Admin.find({ userType: 'teacher' })
    const subject = await Subject.find({})
    const curClass = await Class.findById(req.params.classId)
    res.render('admin/editClass.ejs', {
      curClass,
      teachers,
      subject
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/:classId', async (req, res) => {
  try {
    const curClass = await Class.findById(req.params.classId)
    await curClass.updateOne(req.body)
    res.redirect('/admin/class')
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

// -------------end Class section ----------------

// -------------Teacher section ------------------
router.get('/teacher', async (req, res) => {
  try {
    const teachers = await Admin.find({ userType: 'teacher' })
    const populateClass = await Class.find({})
    const subject = await Subject.find({})
    res.render('admin/teacher.ejs', {
      subject,
      populateClass,
      teachers
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})
// -------------end teacher section --------------

// -------------Subject section ------------------
router.get('/subject', async (req, res) => {
  try {
    const populatedSubject = await Subject.find({})
    console.log('Populated subject:', populatedSubject)
    res.render('admin/subject.ejs', { Subject: populatedSubject })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/newSub', async (req, res) => {
  res.render('admin/newSub.ejs')
})

router.post('/newSub', async (req, res) => {
  await Subject.create(req.body)
  res.redirect('/admin/subject')
})
// -------------End Subject section --------------

module.exports = router
