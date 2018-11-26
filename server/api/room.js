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
      user: process.env.VIZZY_EMAIL,
      pass: process.env.VIZZY_PASS
    }
  })

  const mailOptions = {}
  let address = `https://getvizzy.herokuapp.com/room`
  console.log('req.body.email', req.body.note)
  mailOptions.from = process.env.VIZZY_EMAIL
  mailOptions.to = req.body.to
  mailOptions.subject = 'Invitation to Vizzy Room'
  mailOptions.html = `<p>${req.body.note}</p>
  <p>Hello! ${
    req.body.userEmail
  } has invited you to collaborate. Please go to your <a href=${address} >room</a>, and enter your key: ${
    req.body.room
  }</p>`

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err)
    else console.log(info)
  })

  res.send()
})
