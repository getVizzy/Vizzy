import React, {Component} from 'react'
import {download} from '../../utils'

import {
  VictoryChart,
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

export default class VictoryLineGraph extends Component {
  handleZoom(domain) {
    this.setState({zoomDomain: domain})
  }

  componentDidMount() {
    this.props.changeStyle(this.props.x, 'x');
    this.props.changeStyle(this.props.y, 'y')
    this.props.changeStyle(this.props.color, 'color')
    this.props.changeStyle(this.props.graphSelected, 'graphSelected')
  }

  render() {
    const changeStyle = this.props.changeStyle
    let data = this.props.data
    let keys = Object.keys(data[0])
    let y = this.props.y
    let x = this.props.x
    let downloadPNG = download.bind(this)
    if(!Object.keys(this.props.data[0]).includes(this.props.x)) {
      return "Gathering data..."
    } else {
    return (
      <div id="container">
        <div id="chart">
          <VictoryChart
            theme={VictoryTheme.material}
            style={{parent: {maxWidth: '100%'}}}
            width={600}
            height={470}
            // scale={{x: 'time'}}
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
            <VictoryLine
              style={{
                data: {stroke: this.props.color}
              }}
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
              tickValues={data.map(datum => datum[x])}
              tickFormat={data.map(datum => {
                if (typeof datum[x] === 'string') {
                  return datum[x].slice(0, 3)
                } else {
                  return datum[x]
                }
              })}
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
        <div>
          <button
            onClick={() => downloadPNG(this.props.title, this.props.graphId)}
          >
            Download
          </button>
          <canvas
            id={this.props.graphId}
            width="600"
            height="470"
            display="none"
            style={{visibility: 'hidden', zIndex: -950, position: 'absolute'}}
          />
        </div>
      </div>
    )
  }
}
}
