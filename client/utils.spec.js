const {expect} = require('chai')
const { reinstateNumbers } = require('./utils')

//array of objects with key/value pairs.
describe('Testing reinstateNumbers function', () => {
  describe('parses numbers', () => {
    it('can parse integers', () => {
      let arr = [{x: '12', y: '0'}]
      let retArr = reinstateNumbers(arr)
      expect(retArr[0].x).to.equal(12)
      expect(retArr[0].y).to.equal(0)
    })
    it('can parse decimal numbers', () => {
      let arr = [{x: '12.10', y: '.034'}]
      let retArr = reinstateNumbers(arr)

      expect(retArr[0].x).to.equal(12.1)
      expect(retArr[0].y).to.equal(0.034)
    })

    it('can parse negative numbers', () => {
      let arr = [{x: '-12.10', y: '-.034', z: '-10'}]
      let retArr = reinstateNumbers(arr)

      expect(retArr[0].x).to.equal(-12.10)
      expect(retArr[0].y).to.equal(-.034)
      expect(retArr[0].z).to.equal(-10)
    })
  })

  describe('Parses strings', () => {
    it('Will not convert regular strings', () => {
      let arr = [{x: 'abc', y: 'def'}]
      let retArr = reinstateNumbers(arr)
      expect(retArr[0].x).to.be.a('string')
      expect(retArr[0].y).to.be.a('string')
    })
    //IMPLEMENT THIS EDGE CASE LATER
    // it('Will not convert serial numbers', () => {
    //   let arr = [{x: '12.10.10', y: '034.1.2'}]
    //   let retArr = reinstateNumbers(arr)
    //   expect(retArr[0].x).to.be.a('string')
    //   expect(retArr[0].y).to.be.a('string')
    // })

    it('Will not convert dates', () => {
      let arr = [{x: '12/10/10', y: '03-1-2'}]
      let retArr = reinstateNumbers(arr)
      expect(retArr[0].x).to.be.a('string')
      expect(retArr[0].y).to.be.a('string')
    })

    it('Will not convert numbers with strange characters', () => {
      let arr = [{x: '121010!', y: '#0312'}]
      let retArr = reinstateNumbers(arr)
      expect(retArr[0].x).to.be.a('string')
      expect(retArr[0].y).to.be.a('string')
    })
  })
})
