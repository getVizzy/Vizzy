const router = require('express').Router()
const {User} = require('../db/models')
const {Data} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const data = await Data.findOne({
      where: {
        userId: req.params.userId
      }
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})
