import React from 'react'
import Bar from './VictoryBarChart'
import Line from './VictoryLineGraph'
import Scatter from './VictoryScatterChart'
import Pie from './VictoryPieChart'


export default function ChartContainer(props) {
  return props.graphSelected === 'bar' ?
    <Bar {...props} /> :
    props.graphSelected === 'line' ?
      <Line {...props} /> :
      props.graphSelected === 'scatter' ?
        <Scatter {...props} /> :
        props.graphSelected === 'pie' ?
          <Pie {...props} /> :
          <div />
}


