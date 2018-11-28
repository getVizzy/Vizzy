const {expect} = require('chai')
const reinstateNumbers = require('./utils')

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

      expect(retArr[0].x).to.equal(-12.1)
      expect(retArr[0].y).to.equal(-0.034)
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
    it('Will not convert serial numbers', () => {
      let arr = [{x: '12.10.10', y: '034.1.2'}]
      let retArr = reinstateNumbers(arr)
      expect(retArr[0].x).to.be.a('string')
      expect(retArr[0].y).to.be.a('string')
    })

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

    it('Will not convert numbers with strange characters', () => {
      let arr = [{x: '121010!', y: '#0312'}]
      let retArr = reinstateNumbers(arr)
      expect(retArr[0].x).to.be.a('string')
      expect(retArr[0].y).to.be.a('string')
    })

    it('Will convert dollars to numbers', () => {
      let arr = [{x: '$121.010', y: '$312'}]
      let retArr = reinstateNumbers(arr)
      expect(retArr[0].x).to.be.a('number')
      expect(retArr[0].x).to.equal(121.01)
      expect(retArr[0].y).to.be.a('number')
      expect(retArr[0].y).to.equal(312)
    })

    it('Will convert percentages to numbers', () => {
      let arr = [{x: '121.010%', y: '%.04'}]
      let retArr = reinstateNumbers(arr)
      expect(retArr[0].x).to.be.a('number')
      expect(retArr[0].x).to.equal(121.01)
      expect(retArr[0].y).to.be.a('number')
      expect(retArr[0].y).to.equal(0.04)
    })
    it('Will convert things with commas to numbers', () => {
      let arr = [{x: '121,010', y: '10,000,400'}]
      let retArr = reinstateNumbers(arr)
      expect(retArr[0].x).to.be.a('number')
      expect(retArr[0].x).to.equal(121010)
      expect(retArr[0].y).to.be.a('number')
      expect(retArr[0].y).to.equal(10000400)
    })
  })
})
