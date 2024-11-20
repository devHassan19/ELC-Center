const express = require('express')

const router = express.Router()

const adminCtrl = require('../controllers/admin')

router.get('/', adminCtrl.index)

module.exports = router
