import React, {Component} from 'react'

import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel
} from 'victory'

import {download} from '../../utils'

export default class VictoryBarChart extends Component {
  constructor() {
    super()

  }

  componentDidMount() {
    this.props.changeStyle(this.props.x, 'x');
    this.props.changeStyle(this.props.y, 'y');
    this.props.changeStyle(this.props.color, 'color')
    this.props.changeStyle(this.props.graphSelected, 'graphSelected')
  }

  render() {
    let data = this.props.data
    let downloadPNG = download.bind(this)

    if(!Object.keys(this.props.data[0]).includes(this.props.x)) {
      return "Gathering data..."
    } else
      return (
      <div id="container">
        <div id="chart">
          <VictoryChart
            theme={VictoryTheme.material}
            style={{parent: {maxWidth: '100%'}}}
            domainPadding={60}
            width={600}
            height={400}
            padding={{left: 100, right: 25, top: 35, bottom: 75}}
          >
            <VictoryLabel
              text={this.props.title}
              style={{
                fontSize: 16,
                textAnchor: 'start',
                verticalAnchor: 'end',
                fill: '#000000',
                fontFamily: 'inherit',
                fontWeight: 'bold'
              }}
              x={100}
              y={24}
            />

            <VictoryAxis
              label={this.props.x}
              style={{
                axis: {stroke: '#756f6a'},
                axisLabel: {fontSize: 12, padding: 30}
              }}
              tickValues={data.map(datum => datum[this.props.x])}
              tickFormat={data.map(datum => {
                if (typeof datum[this.props.x] === 'string') {
                  return datum[this.props.x].slice(0, 3)
                } else {
                  return datum[this.props.x]
                }
              })}
            />

            <VictoryAxis
              dependentAxis
              label={this.props.y}
              style={{
                axis: {stroke: '#756f6a'},
                axisLabel: {fontSize: 12, padding: 60}
              }}
            />
            <VictoryStack>
              <VictoryBar
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{fill: 'white', stroke: 'lightgrey'}}
                    cornerRadius={+this.props.tooltip}
                  />
                }
                style={{data: {fill: this.props.color}}}
                animate={{
                  duration: 2000,
                  onLoad: {duration: 1000}
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
                              style: {fill: this.props.highlight}
                            })
                          },
                          {
                            target: 'labels',
                            mutation: () => ({active: true})
                          }
                        ]
                      },
                      onMouseOut: () => {
                        return [
                          {
                            target: 'data',
                            mutation: () => {}
                          },
                          {
                            target: 'labels',
                            mutation: () => ({active: false})
                          }
                        ]
                      }
                    }
                  }
                ]}
                data={data.map(datum => {
                  let label = datum[this.props.y].toString()
                  label = this.props.addComma(label) || label
                  datum.label = label
                  return datum
                })}
                x={this.props.x}
                y={this.props.y}
                barRatio={0.9}
              />
            </VictoryStack>
          </VictoryChart>
        </div>
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
          style={{visibility: 'hidden', zIndex: -950, position: 'absolute'}}
        />
      </div>
    )
  }
}