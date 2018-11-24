import React, { Component } from 'react'

import {
  VictoryPie,
  VictoryLegend,
  VictoryContainer,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel
} from 'victory'

import { download } from '../../utils'
import { conv1dWithBias } from '@tensorflow/tfjs-layers/dist/layers/convolutional'

// const data = [
//   { quarter: '1', earnings: 13, items: 40, state: 'NY' },
//   { quarter: '2', earnings: 16, items: 60, state: 'NY' },
//   { quarter: '3', earnings: 17, items: 70, state: 'NY' },
//   { quarter: '4', earnings: 18, items: 80, state: 'NY' },
//   { quarter: '4', earnings: 18, items: 81, state: 'NY' },
//   { quarter: '4', earnings: 19, items: 90, state: 'NY' }
// ]


export default class VictoryPieChart extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    let downloadPNG = download.bind(this)
    let { data, x, y, pieColor, pieTransformation } = this.props

    //code to parsed and aggregate data that can be consumed for Victory pie chart (i.e. {x:label, y:value})
    let filterData = []
    let dict = {}

    data.forEach(datum => {
      let label = datum[x].toString()
      let value = datum[y]
      filterData.push({ 'x': label, 'y': value })
    })

    filterData.forEach(obj => {
      let key = obj.x
      if (!dict[key])
        dict[key] = obj.y
      else
        dict[key] += obj.y
    })

    let parsedData = Object.keys(dict).map(function (key) {
      return { x: key, y: dict[key] };
    });

    let totalValues = 0
    parsedData.forEach(datum => {
      totalValues += datum.y
    })

    console.log('Victory data', this.props)

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
            data={parsedData}
            labels={(d) => `${this.props.x} ${d.x}: ${Math.round(((d.y) / totalValues) * 100)}%`}
            theme={VictoryTheme.material}
            domainPadding={60}
            width={600}
            height={400}
            padding={{ left: 100, right: 60, top: 35, bottom: 75 }}
            size={7}
            labelRadius={90}
            style={{
              labels: {
                fill: 'black',
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
            colorScale={pieColor}
            innerRadius={pieTransformation === 'donut' ? 100 : 0}
            cornerRadius={pieTransformation === 'flower' ? 25 : 0}
            padAngle={pieTransformation === 'separate' ? 10 : 0}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={() => downloadPNG(this.props.title, this.props.graphId)}
          >
            Download
            </button>
        </div>
        <canvas
          id={this.props.graphId}
          width="600"
          height="400"
          display="none"
          style={{ visibility: 'hidden', zIndex: -950, position: 'absolute' }}
        />
      </div>
    )
  }
}
