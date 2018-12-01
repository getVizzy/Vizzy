import React, {Component} from 'react'
import {download} from '../../utils'
import Download from './Download'
import history from '../../history'
import DeleteGraph from './DeleteGraph'

import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
  VictoryVoronoiContainer
} from 'victory'

export default class VictoryLineGraph extends Component {
  handleZoom(domain) {
    this.setState({zoomDomain: domain})
  }

  render() {
    let data = this.props.data
    let y = this.props.y
    let x = this.props.x
    let downloadPNG = download.bind(this)
    const date = new Date(this.props.createdAt).toDateString()
    return (
      <div id="container">
        <div className="date">
          {history.location.pathname === '/dashboard' ? (
            <div>{date}</div>
          ) : null}
        </div>
        <div id="chart">
          <VictoryChart
            theme={VictoryTheme.material}
            style={{parent: {maxWidth: '100%'}}}
            width={600}
            height={400}
            // scale={{x: 'time'}}
            padding={{left: 100, right: 25, top: 35, bottom: 75}}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiDimension="x"
                labels={d => `${y}: ${d[y]}`}
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
                fontSize: 20,
                textAnchor: 'start',
                verticalAnchor: 'end',
                fill: '#455A64',
                fontFamily: 'inherit'
              }}
              x={100}
              y={24}
            />
            <VictoryLine
              style={{
                data: {stroke: this.props.color, strokeWidth: 6}
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
            {typeof data[0][x] === 'string' ? (
              <VictoryAxis
                label={x}
                style={{
                  axis: {stroke: '#756f6a'},
                  axisLabel: {
                    fontSize: 16,
                    padding: 60,
                    fontFamily: 'inherit',
                  },
                  tickLabels: {angle: 20, y: 150}
                }}
                tickValues={data.map(datum => datum[x])}
                tickFormat={data.map(datum => {
                  return datum[x]
                })}
              />
            ) : (
              <VictoryAxis
                label={x}
                style={{
                  axis: {stroke: '#756f6a'},
                  axisLabel: {
                    fontSize: 16,
                    padding: 60,
                    fontFamily: 'inherit'
                  },
                  tickLabels: {angle: 20}

                }}
              />
            )}

            <VictoryAxis
              dependentAxis
              label={y}
              style={{
                axis: {stroke: '#756f6a'},
                axisLabel: {fontSize: 16, padding: 80}
              }}
            />
          </VictoryChart>
        </div>
        <div id="controls">
          {history.location.pathname === '/dashboard' ? (
            <div>
              <Download
                downloadPNG={downloadPNG}
                title={this.props.title}
                graphId={this.props.graphId}
              />
              <DeleteGraph
                graphId={this.props.graphId}
                delete={this.props.delete}
              />
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}
