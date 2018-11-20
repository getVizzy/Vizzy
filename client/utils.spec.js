const {expect} = require('chai')
const reinstateNumbers = require('./utils')

//array of objects with key/value pairs.
describe('Testing reinstateNumbers function', () => {
  describe('parses regular numbers', () => {
    it('can parse negative and decimal numbers', () => {
      let arr = [{x: '12.1', y: '-13.4'}]
      let retArr = reinstateNumbers(arr)
      expect(retArr[0].x).to.equal(12.1)
      expect(retArr[0].y).to.equal(-13.4)
    })
  })
})
