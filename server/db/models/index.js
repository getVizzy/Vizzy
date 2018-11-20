const User = require('./user')
const Label = require('./label')
const Data = require('./data')
const Graph = require('./graph')

User.hasMany(Graph)
Graph.belongsTo(User)

User.hasMany(Data)
Data.belongsTo(User)

Graph.belongsTo(Data)

Label.belongsToMany(Graph, {through: 'GraphLabel'})
Graph.belongsToMany(Label, {through: 'GraphLabel'})

module.exports = {
  User,
  Label,
  Data,
  Graph
}
