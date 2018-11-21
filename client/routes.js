import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome, FileDrop } from './components'
import { me } from './store'
import Dashboard from './components/Dashboard'
import VictoryBarChart from './components/VictoryBarChart'
import VictoryLineGraph from './components/VictoryLineGraph'
import VictoryScatterChart from './components/VictoryScatterChart'
import VictoryPieChart from './components/VictoryPieChart'
import HomeView from './components/Home/HomeView'
import TempDashboard from './components/TempDashboard'
import EditView from './components/EditGraphs/EditView'
import RoomSelection from './components/Room/RoomSelection'
import EditRoom from './components/Room/EditRoom'
import CreateRoom from './components/Room/CreateRoom'
import TestSave from './components/TestSave'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* Below route only for testing PC */}
        <Route path="/test" component={TempDashboard} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={HomeView} />
            <Route path="/upload" component={FileDrop} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/bar" component={VictoryBarChart} />
            <Route path="/line" component={VictoryLineGraph} />
            <Route path="/scatter" component={VictoryScatterChart} />
            <Route path="/pie" component={VictoryPieChart} />
            <Route path="/editgraph" component={EditView} />
            <Route exact path="/room" component={RoomSelection} />
            <Route path="/room/live" component={EditView} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
