import React, { Component } from 'react'
import {connect} from 'react-redux'
import BarChart from './BarChart'
import LineChart from './LineChart'


class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount() {

  }
  render() {
    console.log("DATA", this.props.data)
    return (
      <div id="container-row">
        <div>
          <BarChart data={this.props.data} />
        </div>
        <div>
          <LineChart data={this.props.data} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.user.data
})

export default connect(mapStateToProps)(Dashboard)

