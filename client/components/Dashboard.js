import React, { Component } from 'react'
import {connect} from 'react-redux'
import BarChart from './BarChart'

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
      <BarChart data={this.props.data} />
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.user.data
})

export default connect(mapStateToProps)(Dashboard)

