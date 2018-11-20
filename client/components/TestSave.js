import React from 'react'
import VictoryBarChart from './VictoryBarChart'
import { download, addComma } from '../utils'

let savedProps = {
    graphSelected: 'bar',
    color: 'tomato',
    title: 'Test Graph',
    highlight: 'orange',
    tooltip: '5',
    x: 'quarter',
    y: 'earnings',
    dataId: 1
}

let data = [
  {quarter: '1', earnings: 13000, items: 40000, state: 'NY'},
  {quarter: '2', earnings: 16500, items: 60000, state: 'NY'},
  {quarter: '3', earnings: 15340, items: 30000, state: 'NY'},
  {quarter: '4', earnings: 18000, items: 70000, state: 'NY'}
]

export default function TestSave () {
  return (
    <div>
      <VictoryBarChart color={savedProps.color} title={savedProps.title} highlight={savedProps.highlight} tooltip={savedProps.tooltip} x={savedProps.x} y={savedProps.y} data={data} addComma={addComma} download={download} />
    </div>
  )
}
