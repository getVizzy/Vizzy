const Sequelize = require('sequelize')
const db = require('../db')

const Graph = db.define('graph', {
  svgString: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Graph
