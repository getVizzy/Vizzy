import React, {Component} from 'react'
import {download} from '../../utils'
import Download from './Download'
import history from '../../history'
import DeleteGraph from './DeleteGraph'

import * as d3 from 'd3'
import {
  VictoryChart,
  VictoryScatter,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
  VictoryVoronoiContainer
} from 'victory'

export default class VictoryScatterChart extends Component {
  render() {
    let data = this.props.data
    const changeStyle = this.props.changeStyle
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
                fontSize: 20,
                textAnchor: 'start',
                verticalAnchor: 'end',
                fill: '#455A64',
                fontFamily: 'inherit'
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
                          mutation: () => ({active: true})
                        }
                      ]
                    }
                  }
                }
              ]}
            />
            <VictoryLine data={this.props.regressionLine} x={x} y={y} />
            {/* <VictoryLabel
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
            /> */}

            <VictoryAxis
              label={x}
              style={{
                axis: {stroke: '#756f6a'},
                axisLabel: {fontSize: 16, padding: 60}
              }}
            />
            <VictoryAxis
              dependentAxis
              label={y}
              style={{
                axis: {stroke: '#756f6a'},
                axisLabel: {fontSize: 16, padding: 80}
              }}
            />
          </VictoryChart>
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
            {history.location.pathname === '/dashboard' ? (
              <div>
                <Download
                  downloadPNG={downloadPNG}
                  title={this.props.title}
                  graphId={this.props.graphId}
                  delete={this.props.deleteNotification}
                />
                <DeleteGraph
                  graphId={this.props.graphId}
                  delete={this.props.delete}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}
