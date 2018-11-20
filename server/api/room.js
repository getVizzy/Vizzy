const router = require('express').Router()
const Room = require('../db/models/room')
module.exports = router


// POST api/room - Add room
router.post('/', async (req, res, next) => {
  try {
    console.log('POST', req.body)
    let room = await Room.create(req.body)

    res.status(201).json(room)
  }
  catch (error) { next(error) }
})

// GET api/room  - get ALL rooms
router.get('/', async (req, res, next) => {
  try {
    let rooms = await Room.findAll()
    res.json(rooms)
  }
  catch (error) { next(error) }
})


