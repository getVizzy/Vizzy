const User = require('./user')
const Data = require('./data')
const Graph = require('./graph')
const Room = require('./room')

User.hasMany(Graph)
Graph.belongsTo(User)

User.hasMany(Data)
Data.belongsTo(User)

Graph.belongsTo(Data)
Data.hasMany(Graph)

module.exports = {
  User,
  Data,
  Graph,
  Room
}
