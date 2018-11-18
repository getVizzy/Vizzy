import React, {Component} from 'react'
import {connect} from 'react-redux'
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

const data = [
  {'Degrees Celsius Below Zero': 1, 'Hundreds of Pounds of Cocoa Sold': 2},
  {'Degrees Celsius Below Zero': 2, 'Hundreds of Pounds of Cocoa Sold': 3},
  {'Degrees Celsius Below Zero': 3, 'Hundreds of Pounds of Cocoa Sold': 5},
  {'Degrees Celsius Below Zero': 4, 'Hundreds of Pounds of Cocoa Sold': 4},
  {'Degrees Celsius Below Zero': 5, 'Hundreds of Pounds of Cocoa Sold': 7}
]

class VictoryScatterChart extends Component {
  constructor() {
    super()
    this.state = {
      color: 'tomato',
      x: null,
      y: null,
      title: '',
      highlight: 'orange',
      tooltip: '5'
    }
    this.changeStyle = this.changeStyle.bind(this)
  }

  handleZoom(domain) {
    this.setState({zoomDomain: domain})
  }

  changeStyle(value, attribute) {
    this.setState({
      [attribute]: value
    })
  }

  render() {
    if (!data) {
      return 'Loading...'
    } else {
      let keys = Object.keys(data[0])
      let y = this.state.y || keys[1]
      let x = this.state.x || keys[0]
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
                      cornerRadius={+this.state.tooltip}
                      flyoutStyle={{fill: 'white', stroke: 'lightgrey'}}
                    />
                  }
                />
              }
            >
              <VictoryLabel
                text={this.state.title}
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
                style={{data: {fill: this.state.color}}}
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
            <p>Left Axis:</p>
            <select
              onChange={e => {
                //save old y value

                let newX = this.state.y
                if (this.state.y === null) {
                  newX = keys[1]
                }

                this.changeStyle(e.target.value, 'y')
                this.changeStyle(newX, 'x')
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
            </select>

            <p>Dot Color:</p>
            <select onChange={e => this.changeStyle(e.target.value, 'color')}>
              <option value="tomato">Tomato</option>
              <option value="gold">Gold</option>
              <option value="orange">Orange</option>
              <option value="#f77">Salmon</option>
              <option value="#55e">Purple</option>
              <option value="#8af">Periwinkle</option>
            </select>

            <p>Pointer:</p>
            <select onChange={e => this.changeStyle(e.target.value, 'tooltip')}>
              <option value={5}>Round edge</option>
              <option value={0}>Square</option>
              <option value={25}>Circle</option>
            </select>

            <p>Graph Title:</p>
            <input
              value={this.state.title}
              onChange={e => this.changeStyle(e.target.value, 'title')}
            />
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  data: state.user.data
})

export default connect(mapStateToProps)(VictoryScatterChart)
