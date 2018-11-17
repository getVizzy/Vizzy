const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

const Dashboard = db.define('dashboard', {
  roomKey: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    get() {
      return () => this.getDataValue('roomKey')
    }
    //key is set on the front end
    // set() {
    //   const key =
    //     Math.random()
    //       .toString(36)
    //       .substring(2, 15) +
    //     Math.random()
    //       .toString(36)
    //       .substring(2, 15)
    //   this.setDataValue('roomKey', key)
    // }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

Dashboard.prototype.correctRoomKey = function(candidateKey) {
  return Dashboard.encryptRoomKey(candidateKey, this.salt()) === this.roomKey()
}

/**
 * classMethods
 */
Dashboard.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Dashboard.encryptRoomKey = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltRoomKey = dashboard => {
  if (dashboard.changed('roomKey')) {
    dashboard.salt = Dashboard.generateSalt()
    dashboard.roomKey = Dashboard.encryptRoomKey(
      dashboard.roomKey(),
      dashboard.salt()
    )
  }
}

Dashboard.beforeCreate(setSaltRoomKey)
Dashboard.beforeUpdate(setSaltRoomKey)

module.exports = Dashboard
