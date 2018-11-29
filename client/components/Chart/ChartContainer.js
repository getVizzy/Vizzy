import React, {Component} from 'react'
import Bar from './VictoryBarChart'
import Line from './VictoryLineGraph'
import Scatter from './VictoryScatterChart'
import Pie from './VictoryPieChart'
import CircularProgress from '@material-ui/core/CircularProgress'

export default class ChartContainer extends Component {
  render() {

    return this.props.graphSelected === 'bar' ? (
      <Bar {...this.props} />
    ) : this.props.graphSelected === 'line' ? (
      <Line {...this.props} />
    ) : this.props.graphSelected === 'scatter' ? (
      <Scatter {...this.props} />
    ) : this.props.graphSelected === 'pie' ? (
      <Pie {...this.props} />
    ) : (
      ''
    )
  }
}
