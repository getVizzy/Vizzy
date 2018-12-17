const {expect} = require('chai')
const db = require('../index')
const Graph = db.model('graph')
const User = db.model('user')
const Data = db.model('data')

describe('Graph model', () => {
  describe('assocations', () => {
    it('creates one to many association in which a graph belongs to one user', async () => {
      const user = await User.create({
        email: 'ginger@email.com',
        password: 'candy'
      })
      const graph = await Graph.create({
        properties: {
          graphSelected: 'scatter',
          color: '#01665E',
          title: 'Apples and Revenue',
          highlight: '#FEE090',
          tooltip: '5',
          x: 'Revenue',
          y: 'Apples'
        }
      })
      await graph.setUser(user)

      const graphUser = await Graph.findById(graph.id, {
        attributes: ['userId']
      })
      expect(graphUser.userId).to.equal(user.id)
    })
  })
  it('creates a one to many association in which graph belongs to one data set', async () => {
    const datum = await Data.create({
      dataJSON: {
        name: 'Apples.csv',
        data: [
          {Month: 'January', 'Apples Sold': '150', Revenue: '1000'},
          {Month: 'February', 'Apples Sold': '234', Revenue: '1400'},
          {Month: 'March', 'Apples Sold': '145', Revenue: '1456'},
          {Month: 'April', 'Apples Sold': '150', Revenue: '678'},
          {Month: 'May', 'Apples Sold': '260', Revenue: '3450'},
          {Month: 'June', 'Apples Sold': '129', Revenue: '1254'},
          {Month: 'July', 'Apples Sold': '456', Revenue: '1200'},
          {Month: 'August', 'Apples Sold': '300', Revenue: '1100'},
          {Month: 'September', 'Apples Sold': '325', Revenue: '1250'},
          {Month: 'October', 'Apples Sold': '276', Revenue: '1780'},
          {Month: 'November', 'Apples Sold': '215', Revenue: '1900'},
          {Month: 'December', 'Apples Sold': '123', Revenue: '1340'}
        ],
        view: 'upload'
      }
    })

    const graph = await Graph.create({
      properties: {
        graphSelected: 'scatter',
        color: '#01665E',
        title: 'Apples and Revenue',
        highlight: '#FEE090',
        tooltip: '5',
        x: 'Revenue',
        y: 'Apples'
      }
    })
    await graph.setDatum(datum)

    const graphUser = await Graph.findById(graph.id, {
      attributes: ['datumId']
    })
    expect(graphUser.datumId).to.equal(datum.id)
  })
})
