const router = require('express').Router()
const { Graph, Data } = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const graph = await Graph.create({
      userId: req.user.id,
      properties: req.body,
      datumId: req.body.dataId
    })
    res.send(graph)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    if (req.user.id) {
      const graphs = await Graph.findAll({
        where: {
          userId: req.user.id
        }, include: [{
          model: Data
        }]
      })
      res.send(graphs)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})
module.exports = router
