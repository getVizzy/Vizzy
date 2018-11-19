const Sequelize = require('sequelize')
const db = require('../db')

const Label = db.define('label', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})

module.exports = Label
