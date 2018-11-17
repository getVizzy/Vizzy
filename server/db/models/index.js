const User = require('./user')
const Dashboard = require('./dashboard')
const Data = require('./data')
const Graph = require('./graph')

User.hasMany(Dashboard)
Dashboard.belongsTo(User)

Dashboard.hasMany(Data)
Data.belongsTo(Dashboard)

Graph.belongsTo(Dashboard)
Dashboard.hasMany(Graph)

module.exports = {
  User,
  Dashboard,
  Data,
  Graph
}
