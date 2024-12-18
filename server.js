//--------------Const -----------------//
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')
const isSignIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')

const port = process.env.PORT ? process.env.PORT : '3000'
const path = require('path')
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use(passUserToView)

app.use((req, res, next) => {
  if (req.session.message) {
    console.log('req.session.message', req.session.message)
    res.locals.message = req.session.message
    req.session.message = null
  } else {
    res.locals.message = null
  }
  next()
})

// Require Controller
const authController = require('./controllers/auth')
const adminCtrl = require('./controllers/admin.js')
const studentCtrl = require('./controllers/student.js')

// Use Controllers

app.use('/auth', authController)
app.use('/admin', isSignIn, adminCtrl)
app.use('/student', isSignIn, studentCtrl)

app.get('/', async (req, res) => {
  res.render('index.ejs')
})

app.listen(port, () => {
  console.log(`The express app is ready on part ${port}`)
})
