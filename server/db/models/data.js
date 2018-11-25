const Sequelize = require('sequelize')
const db = require('../db')

const Data = db.define('data', {
  name: {
    type: Sequelize.STRING,
  },
  dataJSON: {
    type: Sequelize.JSON
  }
})

module.exports = Data
