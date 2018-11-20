const Sequelize = require('sequelize')
const db = require('../db')

const Graph = db.define('graph', {
  properties: {
    type: Sequelize.JSON,
    allowNull: false
  }
})

module.exports = Graph
