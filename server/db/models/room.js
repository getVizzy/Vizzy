const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('room', {
  roomKey: {
    type: Sequelize.TEXT,
  }
})

module.exports = Room
