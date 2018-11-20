const User = require('./user')
const Label = require('./label')
const Data = require('./data')
const Graph = require('./graph')
const Room = require('./room')

User.hasMany(Graph)
Graph.belongsTo(User)

User.hasMany(Data)
Data.belongsTo(User)

Label.belongsToMany(Graph, {through: 'GraphLabel'})
Graph.belongsToMany(Label, {through: 'GraphLabel'})

module.exports = {
  User,
  Label,
  Data,
  Graph,
  Room
}
