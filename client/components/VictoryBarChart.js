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


//TWO SETS OF DUMMY DATA FOR EXPERIMENTING
//ENSURE JSON DATA VALUES ARE NUMBERS NOT STRINGS

// let allData = [
//   {Month: 'January', Apples: '50', Revenue: '1230'},
//   {Month: 'February', Apples: '75', Revenue: '1500'},
//   {Month: 'March', Apples: '90', Revenue: '1900'},
//   {Month: 'April', Apples: '67', Revenue: '1300'},
//   {Month: 'May', Apples: '123', Revenue: '1200'},
//   {Month: 'June', Apples: '56', Revenue: '1345'},
//   {Month: 'July', Apples: '87', Revenue: '1875'},
//   {Month: 'August', Apples: '143', Revenue: '1300'},
//   {Month: 'September', Apples: '59', Revenue: '1330'},
//   {Month: 'October', Apples: '68', Revenue: '1450'},
//   {Month: 'November', Apples: '89', Revenue: '1890'},
//   {Month: 'December', Apples: '100', Revenue: '1100'}
// ]

export default class VictoryBarChart extends Component {
  constructor() {
    super()
  }

  render() {
      let data = this.props.data;
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
            <button onClick={() => this.props.downloadPNG(this.props.title)}>
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


