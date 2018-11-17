const {expect} = require('chai')
const db = require('../index')
const Data = db.model('data')

describe('Data model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('create Data', () => {
    describe('will create valid new row', async () => {
      const jss = {hi: 'hello world'}
      let row
      try {
        row = await Data.create({dataJSON: JSON})
      } catch (err) {
        console.log(err)
      }
      console.log('row is', row)
      const string1 = JSON.stringify(row.dataValues.dataJSON)
      const string2 = JSON.stringify(JSON)
      //converting to string because two objects are stored at different locations in memory
      expect(string1).to.equal(string2)
    })
  })
}) // end describe('Data model')
