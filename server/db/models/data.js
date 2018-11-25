const Sequelize = require('sequelize')
const db = require('../db')

const Data = db.define('data', {
  //Name of file is store in JSON object under 'name' property
  dataJSON: {
    type: Sequelize.JSON
  }
})

module.exports = Data
