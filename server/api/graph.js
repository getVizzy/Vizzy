const router = require('express').Router()
const {Graph, Data} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const graph = await Graph.create({
      userId: req.user.id,
      properties: req.body,
      datumId: req.body.dataId
    })
    console.log("FIRST GRAPH", graph)
    const allData = await Graph.findAll({
      where: {
        id: graph.id
      },
      include: [
        {
          model: Data
        }
      ]
    })
    console.log("ALL DATA", allData[0])
    res.send(allData[0])
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
        },
        include: [
          {
            model: Data
          }
        ]
      })
      res.send(graphs)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:graphId', async (req, res, next) => {
  try {
    const graph = await Graph.destroy({
      where: {
        id: req.params.graphId
      }
    })
    res.sendStatus(202)
  } catch (error) {
    next(error)
  }
})
module.exports = router
