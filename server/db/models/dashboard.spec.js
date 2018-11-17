const {expect} = require('chai')
const db = require('../index')
const Dashboard = db.model('dashboard')

describe('Dashboard model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('create Dashboard', () => {
    describe('will not create invalid new row', async () => {
      let error
      try {
        let result = await Dashboard.create({})
      } catch (err) {
        error = err
      }
      expect(error).to.be.an.instanceOf(Error)
    })

    describe('will create valid new row', async () => {
      const key =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      let data, row
      try {
        row = await Dashboard.create({roomKey: key})
      } catch (err) {}
      expect(row).to.not.equal(undefined)
    })
  })
}) // end describe('Dashboard model')
