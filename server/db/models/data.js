const Sequelize = require('sequelize')
const db = require('../db')

const Data = db.define('data', {
  dataJSON: {
    type: Sequelize.JSON
  }
})

module.exports = Data
