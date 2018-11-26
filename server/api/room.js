const router = require('express').Router()
const Room = require('../db/models/room')
const nodemailer = require('nodemailer')

module.exports = router

// POST api/room - Add room
router.post('/', async (req, res, next) => {
  try {
    let room = await Room.create(req.body)

    res.status(201).json(room)
  } catch (error) {
    next(error)
  }
})

// GET api/room  - get ALL rooms
router.get('/', async (req, res, next) => {
  try {
    let rooms = await Room.findAll()
    res.json(rooms)
  } catch (error) {
    next(error)
  }
})

// POST api/room/email - sends an email to user with the room id

router.post('/email', (req, res, next) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vizzynoreply@gmail.com',
      pass: 'H&llo123'
    }
  })
  // const mailOptions = {
  //   from: 'vizzynoreply@gmail.com', // sender address
  //   to: 'grace@daher.net', // list of receivers
  //   subject: 'Subject of your email', // Subject line
  //   html: '<p>Your html here</p>' // plain text body
  //}
  const mailOptions = {}
  mailOptions.from = 'vizzynoreply@gmail.com'
  mailOptions.to = req.body.to
  mailOptions.subject = req.body.subject
  mailOptions.html = req.body.html

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err)
    else console.log(info)
  })

  res.send()
})
