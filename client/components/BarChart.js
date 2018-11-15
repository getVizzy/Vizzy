import React, { Component } from 'react'
import {connect} from 'react-redux'

class BarChart extends Component {
  constructor(props) {
    super()
    this.state = {
      data: props.data
    }
  }
  componentDidMount() {

  }

  render() {
    return (
      <div>{this.state.data || [] }</div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.user.data
})

export default connect(mapStateToProps)(BarChart)

