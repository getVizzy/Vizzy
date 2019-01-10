const router = require('express').Router()
const {User, Data, Graph} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    let data = await Data.create({
      userId: req.user.id,
      dataJSON: req.body,
      name: req.body.name
    })
    res.send(data)
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
        include: [{model: User}]
      })
      res.send(data)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:dataId', async (req, res, next) => {
  try {
    await Graph.destroy({
      where: {
        datumId: req.params.dataId
      }
    })

    const dataSet = await Data.destroy({
      where: {
        id: req.params.dataId
      }
    })

    res.sendStatus(202)
  } catch (error) {
    next(error)
  }
})
module.exports = router
