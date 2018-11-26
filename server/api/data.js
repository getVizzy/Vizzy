const router = require('express').Router()
const { User, Data } = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    await Data.create({
      userId: req.user.id,
      dataJSON: req.body
    })
    res.send(req.body)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    if (req.user.id) {
      const data = await Data.findAll({
        where: {
          userId: req.user.id
        },
        include: [{ model: User }]
      })
      res.send(data)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})
module.exports = router
