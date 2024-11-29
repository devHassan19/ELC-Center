const express = require('express')
const router = express.Router()
const Admin = require('..//models/user')
const Subject = require('../models/subject')
const Class = require('../models/class')
const Teacher = require('../models/teacher')

router.get('/', async (req, res) => {
  try {
    res.render('admin/index.ejs')
  } catch (error) {
    console.log(error)
    res.redirect('/admin')
  }
})

// -------------Class section -------------------

router.get('/newClass', async (req, res) => {
  const teach = await Teacher.find({})
  const subject = await Subject.find({})
  res.render('admin/newClass.ejs', { subject, teach })
})

router.post('/', async (req, res) => {
  await Class.create(req.body)
  res.redirect('/admin/class')
})

router.get('/class', async (req, res) => {
  try {
    const populateClass = await Class.find({})
      .populate('teacher')
      .populate('subject')
    const subject = await Subject.find({})
    res.render('admin/class.ejs', { subject, populateClass })
  } catch (error) {
    console.log(error)
    res.redirect('/admin')
  }
})

router.get('/class/:classId/edit', async (req, res) => {
  try {
    const curClass = await Class.findById(req.params.classId)
    const teach = await Teacher.find({})
    const subject = await Subject.find({})

    res.render('admin/editClass.ejs', {
      curClass,
      subject,
      teach
    })
  } catch (error) {
    console.log(error)
    res.redirect('/admin')
  }
})

router.put('/:classId', async (req, res) => {
  try {
    const curClass = await Class.findById(req.params.classId)
    await curClass.updateOne(req.body)
    res.redirect('/admin/class')
  } catch (error) {
    console.log(error)
    res.redirect('/admin')
  }
})

router.delete('/class/:classId', async (req, res) => {
  try {
    const populateClass = await Class.findById(req.params.classId)
    await Class.deleteOne()
    res.redirect('/admin/class')
  } catch (error) {
    console.error(error)
    res.redirect('/admin')
  }
})

// -------------end Class section ----------------

// -------------Teacher section ------------------
router.get('/teacher', async (req, res) => {
  try {
    const populatedTeachers = await Teacher.find({})
    console.log('Populated teacher:', populatedTeachers)
    res.render('admin/teacher.ejs', { Teacher: populatedTeachers })
  } catch (error) {
    console.log(error)
    res.redirect('/admin')
  }
})

router.get('/newTeach', async (req, res) => {
  res.render('admin/newTeach.ejs')
})

router.post('/newTeach', async (req, res) => {
  await Teacher.create(req.body)
  res.redirect('/admin/teacher')
})

router.get('/teacher/:teacherId/Edit', async (req, res) => {
  try {
    const currentTeacher = await Teacher.findById(req.params.teacherId)
    res.render('admin/editTeach.ejs', {
      Teacher: currentTeacher
    })
  } catch (error) {
    console.log(error)
    res.redirect('/admin')
  }
})

router.put('/teacher/:teacherId', async (req, res) => {
  try {
    const currentTeacher = await Teacher.findById(req.params.teacherId)
    await currentTeacher.updateOne(req.body)
    res.redirect('/admin/teacher')
  } catch (error) {
    console.log(error)
    res.redirect('/admin')
  }
})

router.delete('/teacher/:teacherId', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.teacherId)
    await teacher.deleteOne()
    res.redirect('/admin/teacher')
  } catch (error) {
    console.error(error)
    res.redirect('/admin')
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
    res.redirect('/admin')
  }
})

router.get('/newSub', async (req, res) => {
  res.render('admin/newSub.ejs')
})

router.post('/newSub', async (req, res) => {
  await Subject.create(req.body)
  req.session.message = 'Subject Add successfully'
  res.redirect('/admin/subject')
})

router.get('/:subjectId/edittt', async (req, res) => {
  try {
    const currentSubject = await Subject.findById(req.params.subjectId)
    res.render('admin/editSub.ejs', {
      Subject: currentSubject
    })
  } catch (error) {
    console.log(error)
    res.redirect('/admin')
  }
})

router.put('/admin/:subjectId', async (req, res) => {
  try {
    const currentSubject = await Subject.findById(req.params.subjectId)
    await currentSubject.updateOne(req.body)
    res.redirect('/admin/subject')
  } catch (error) {
    console.log(error)
    res.redirect('/admin')
  }
})

router.delete('/admin/:subjectId', async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.subjectId)
    await subject.deleteOne()
    res.redirect('/admin/subject')
  } catch (error) {
    console.error(error)
    res.redirect('/admin')
  }
})

// -------------End Subject section --------------

module.exports = router
