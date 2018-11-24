import React from 'react'
import Bar from './VictoryBarChart'
import Line from './VictoryLineGraph'
import Scatter from './VictoryScatterChart'
import Pie from './VictoryPieChart'

export default function ChartContainer(props) {
  return props.graphSelected === 'bar' ? (
    <div className="flex-container">
      <Bar {...props} />
    </div>
  ) : props.graphSelected === 'line' ? (
    <div className="flex-container">
      <Line {...props} />
    </div>
  ) : props.graphSelected === 'scatter' ? (
    <div className="flex-container">
      <Scatter {...props} />
    </div>
  ) : props.graphSelected === 'pie' ? (
    <div className="flex-container">
      <Pie {...props} />
    </div>
  ) : (
    <div />
  )
}
