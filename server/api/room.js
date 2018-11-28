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
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.VIZZY_EMAIL,
      pass: process.env.VIZZY_PASS
    }
  })

  const address = `https://getvizzy.herokuapp.com/room`
  let note = req.body.note
    ? `<h3 style="color:black">A note from your Collaborator:</h3> ${
        req.body.note
      }`
    : ''

  const html = `
  <div height="70" style="background-color:#3bc2ea">
  <img
    src="https://i.ibb.co/PhrKRFj/83ee2462-22d7-4278-a9d0-6c513ae2d4af.png"
    alt="83ee2462-22d7-4278-a9d0-6c513ae2d4af"
    border="0"
    width="70"
    height="70"
  />
</div>
  <h3 style="font-family: Roboto, Helvetica, Arial, sans-serif; color:black">Let's get Vizzy! ${
    req.body.userEmail
  } has invited you to collaborate. Please go to your <a href=${address} >room</a>, and enter your key: <h3 style="color:black">${
    req.body.room
  }</h3 style="display:block;color:black"></h3>
  <p style="color:black">${note}</p>`

  //email contents
  const mailOptions = {
    from: process.env.VIZZY_EMAIL,
    to: req.body.to,
    subject: 'Invitation to Vizzy Room',
    html
  }

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err)
    else console.log(info)
  })

  res.send()
})
