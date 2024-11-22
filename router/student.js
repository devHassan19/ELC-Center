const express = require('express')

const router = express.Router()

const studentCtrl = require('../controllers/student')

router.get('/', studentCtrl.index)

module.exports = router
