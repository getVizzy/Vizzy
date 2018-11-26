import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, FileDrop} from './components'
import {me} from './store'
import Dashboard from './components/Dashboard'
import {gotGraphs} from './store/graph'

import VictoryBarChart from './components/Chart/VictoryBarChart'
import VictoryLineGraph from './components/Chart/VictoryLineGraph'
import VictoryScatterChart from './components/Chart/VictoryScatterChart'
import VictoryPieChart from './components/Chart/VictoryPieChart'
import DoubleLine from './components/Chart/DoubleLine'
import HomeView from './components/Home/HomeView'
import TempDashboard from './components/TempDashboard'
import EditView from './components/EditGraphs/EditView'
import RoomSelection from './components/Room/RoomSelection'
import MainPage from './components/MainPage'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    await this.props.getGraphs()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div id="globalContent">
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {/* Below route only for testing PC */}
          <Route
            exact
            path="/"
            render={() => (isLoggedIn ? <Redirect to="/home" /> : <MainPage />)}
          />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/" component={HomeView} />
              <Route path="/home" component={HomeView} />
              <Route path="/upload" component={FileDrop} />
              <Route path="/dashboard" component={TempDashboard} />
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
      </div>
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
    },
    getGraphs: () => dispatch(gotGraphs())
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
