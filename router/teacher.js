const express = require('express')

const router = express.Router()

const teacherCtrl = require('../controllers/teacher')

router.get('/', teacherCtrl.index)

module.exports = router
