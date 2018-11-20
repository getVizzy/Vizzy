import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import {
  VictoryChart,
  VictoryScatter,
  VictoryLine,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
  VictoryVoronoiContainer
} from 'victory'

// const data = [
//   {'Degrees Celsius Below Zero': 1, 'Hundreds of Pounds of Cocoa Sold': 2},
//   {'Degrees Celsius Below Zero': 2, 'Hundreds of Pounds of Cocoa Sold': 2},
//   {'Degrees Celsius Below Zero': 3, 'Hundreds of Pounds of Cocoa Sold': 4},
//   {'Degrees Celsius Below Zero': 4, 'Hundreds of Pounds of Cocoa Sold': 3},
//   {'Degrees Celsius Below Zero': 5, 'Hundreds of Pounds of Cocoa Sold': 4.5},
//   {'Degrees Celsius Below Zero': 6, 'Hundreds of Pounds of Cocoa Sold': 4.5},
//   {'Degrees Celsius Below Zero': 7, 'Hundreds of Pounds of Cocoa Sold': 7},
//   {'Degrees Celsius Below Zero': 8, 'Hundreds of Pounds of Cocoa Sold': 10}
// ]

export default class VictoryScatterChart extends Component {
  render() {
    let data = this.props.data
    const changeStyle = this.props.changeStyle
    let y = this.props.y
    let x = this.props.x

    return (
      <div id="container">
        <div id="chart">
          <VictoryChart
            theme={VictoryTheme.material}
            style={{parent: {maxWidth: '100%'}}}
            // domainPadding={60}
            width={600}
            height={470}
            padding={{left: 100, right: 25, top: 35, bottom: 75}}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension="x"
                labels={d => `${y}:${d[y]}`}
                labelComponent={
                  <VictoryTooltip
                    cornerRadius={+this.props.tooltip}
                    flyoutStyle={{fill: 'white', stroke: 'lightgrey'}}
                  />
                }
              />
            }
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
            <VictoryScatter
              style={{data: {fill: this.props.color}}}
              size={7}
              data={data}
              x={x}
              y={y}
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
            />
            <VictoryLine data={this.props.regressionLine} x={x} y={y} />
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
              label={x}
              style={{
                axis: {stroke: '#756f6a'},
                axisLabel: {fontSize: 12, padding: 30}
              }}
            />
            <VictoryAxis
              dependentAxis
              label={y}
              style={{
                axis: {stroke: '#756f6a'},
                axisLabel: {fontSize: 12, padding: 60}
              }}
            />
          </VictoryChart>
        </div>
        <div id="controls">
          {/* <p>Left Axis:</p>
            <select
              onChange={e => {
                //save old y value

                let newX = this.state.y
                if (this.state.y === null) {
                  newX = keys[1]
                }

                changeStyle(e, 'y')
                changeStyle(newX, 'x')
              }}
            >
              <option
                key={1}
                name="y"
                value={keys[1]}
                defaultValue
              >{`${keys[1][0].toUpperCase()}${keys[1].slice(1)}`}</option>
              <option
                key={0}
                name="y"
                value={keys[0]}
              >{`${keys[0][0].toUpperCase()}${keys[0].slice(1)}`}</option>
            </select> */}

          <button onClick={() => this.props.downloadPNG(this.props.title)}>
            Download
          </button>
        </div>
        <canvas
          id="canvas"
          width="600"
          height="470"
          display="none"
          style={{visibility: 'hidden', zIndex: -950, position: 'absolute'}}
        />
      </div>
    )
  }
}
