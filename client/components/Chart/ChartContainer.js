import React, { Component } from 'react'
import Bar from './VictoryBarChart'
import Line from './VictoryLineGraph'
import Scatter from './VictoryScatterChart'
import Pie from './VictoryPieChart'


export default class ChartContainer extends Component {

  componentDidMount() {
    // this.props.changeStyle(this.props.x, 'x');
    // this.props.changeStyle(this.props.y, 'y');
    // this.props.changeStyle(this.props.color, 'color')
    // this.props.changeStyle(this.props.graphSelected, 'graphSelected')
  }

  render() {
    if(!Object.keys(this.props.data[0]).includes(this.props.x)) {
      return "Gathering data..."
    }

    return this.props.graphSelected === 'bar' ? (
      <Bar {...this.props} />
    ) : this.props.graphSelected === 'line' ? (
      <Line {...this.props} />
    ) : this.props.graphSelected === 'scatter' ? (
      <Scatter {...this.props} />
    ) : this.props.graphSelected === 'pie' ? (
      <Pie {...this.props} />
    ) : (
              <div />
            )
  }
}
