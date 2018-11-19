const router = require('express').Router()
const {Data} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    await Data.create({
      userId: req.user.id,
      dataJSON: req.body
    })
    console.log(req.body, 'body inside of post request')
    res.send(req.body)
  } catch (err) {
    next(err)
  }
})
module.exports = router
