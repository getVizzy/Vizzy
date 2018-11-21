import React, { Component } from 'react'

import {
  VictoryPie,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel
} from 'victory'

import { download } from '../utils'

// const data = [
//   { quarter: '1', earnings: 13, items: 40, state: 'NY' },
//   { quarter: '2', earnings: 16, items: 60, state: 'NY' },
//   { quarter: '3', earnings: 17, items: 70, state: 'NY' },
//   { quarter: '4', earnings: 18, items: 80, state: 'NY' },
//   { quarter: '4', earnings: 18, items: 81, state: 'NY' },
//   { quarter: '4', earnings: 19, items: 90, state: 'NY' }
// ]

const data = [
  { x: "puppy", y: 4 },
  { x: "cat", y: 2 },
  { x: "birds", y: 3 },
  { x: "fish", y: 2 },
  { x: "frogs", y: 1 },
]

let colorOptions = {
  forest: ["#008f68", "#6DB65B", "#4AAE9B", "#EFBB35"],
  sunshine: ["tomato", "orange", "gold", "#f77"],
  sky: ["9FBBCC", "7A9CC6", "80CED7", "9AD1D4"]
}

export default class VictoryPieChart extends Component {
  constructor() {
    super()
    this.state = {
      color: colorOptions.forest
    }
  }

  render() {
    // let data = this.props.data;
    // console.log('HERE', this.props)
    let downloadPNG = download.bind(this)
    return (
      <div id="container">
        <div id="chart">
          <VictoryPie
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: 'white', stroke: 'lightgrey' }}
                cornerRadius={+this.props.tooltip}
              />
            }
            data={data}
            theme={VictoryTheme.material}
            domainPadding={60}
            width={600}
            height={400}
            padding={{ left: 100, right: 25, top: 35, bottom: 75 }}
            size={7}
            labelRadius={90}
            style={{
              labels: {
                fill: "black",
                fontSize: 12,
                maxWidth: '100%'
              }
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: 'data',
                        mutation: () => ({
                          style: { fill: this.props.highlight }
                        })
                      },
                      {
                        target: 'labels',
                        mutation: () => ({ active: true })
                      }
                    ]
                  },
                  onMouseOut: () => {
                    return [
                      {
                        target: 'data',
                        mutation: () => { }
                      },
                      {
                        target: 'labels',
                        mutation: () => ({ active: false })
                      }
                    ]
                  }
                }
              }
            ]}
            colorScale={colorOptions.sky}
          />
          <p>
            <button onClick={() => downloadPNG(this.props.title)}>
              Download
            </button>
          </p>
          <canvas
            id="canvas"
            width="600"
            height="400"
            display="none"
            style={{ visibility: 'hidden', zIndex: -950, position: 'absolute' }}
          />
        </div>
      </div>
    )
  }
}

