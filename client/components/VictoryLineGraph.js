import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as d3 from 'd3'
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

//TWO SETS OF DUMMY DATA FOR EXPERIMENTING
//ENSURE JSON DATA VALUES ARE NUMBERS NOT STRINGS

// let data = [
//   {quarter: 1, earnings: 13000, items: 40000 },
//   {quarter: 2, earnings: 16500, items: 60000 },
//   {quarter: 3, earnings: 14250, items: 50000},
//   {quarter: 4, earnings: 19000, items: 80000}
// ];

let data = [
  {Month: 'January', Apples: 50, Revenue: 1230},
  {Month: 'February', Apples: 75, Revenue: 1500},
  {Month: 'March', Apples: 90, Revenue: 1900},
  {Month: 'April', Apples: 67, Revenue: 1300},
  {Month: 'May', Apples: 123, Revenue: 1200},
  {Month: 'June', Apples: 56, Revenue: 1345},
  {Month: 'July', Apples: 87, Revenue: 1875},
  {Month: 'August', Apples: 143, Revenue: 1300},
  {Month: 'September', Apples: 59, Revenue: 1330},
  {Month: 'October', Apples: 68, Revenue: 1450},
  {Month: 'November', Apples: 89, Revenue: 1890},
  {Month: 'December', Apples: 100, Revenue: 1100}
]

class VictoryLineGraph extends Component {
  constructor() {
    super()
    this.state = {
      color: 'tomato',
      column: null,
      title: '',
      highlight: 'orange',
      tooltip: '5',
      zoomDomain: {
        x: [new Date(2018, 1, 1), new Date(2018, 12, 1)]
      }
    }
    this.changeStyle = this.changeStyle.bind(this)
  }

  handleZoom(domain) {
    this.setState({zoomDomain: domain})
  }

  changeStyle(e, attribute) {
    this.setState({
      [attribute]: e.target.value
    })
  }

  render() {
    if (!data) {
      return 'Loading...'
    } else {
      let keys = Object.keys(data[0])
      let column = this.state.column || keys[1]
      return (
        <div id="container">
          <div id="chart">
            <VictoryChart
              theme={VictoryTheme.material}
              style={{parent: {maxWidth: '100%'}}}
              // domainPadding={60}
              width={600}
              height={470}
              scale={{x: 'time'}}
              padding={{left: 100, right: 25, top: 35, bottom: 75}}
              containerComponent={
                <VictoryVoronoiContainer
                  voronoiDimension="x"
                  labels={d => `${column}:${d[column]}`}
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
              <VictoryLine
                style={{
                  data: {stroke: this.state.color}
                }}
                data={data}
                x={keys[0]}
                y={column}
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
                label={keys[0]}
                style={{
                  axis: {stroke: '#756f6a'},
                  axisLabel: {fontSize: 12, padding: 30}
                }}
                tickValues={data.map(datum => datum[keys[0]])}
                tickFormat={data.map(datum => {
                  if (typeof datum[keys[0]] === 'string') {
                    return datum[keys[0]].slice(0, 3)
                  } else {
                    return datum[keys[0]]
                  }
                })}
              />
              <VictoryAxis
                dependentAxis
                label={column}
                style={{
                  axis: {stroke: '#756f6a'},
                  axisLabel: {fontSize: 12, padding: 60}
                }}
              />
            </VictoryChart>
          </div>
          <div id="controls">
            <p>Left Axis:</p>
            <select onChange={e => this.changeStyle(e, 'column')}>
              {keys.map((key, i) => {
                if (key !== 'label' && key !== keys[0]) {
                  return (
                    <option
                      key={i}
                      name="column"
                      value={key}
                    >{`${key[0].toUpperCase()}${key.slice(1)}`}</option>
                  )
                }
              })}
            </select>

            <p>Line Color:</p>
            <select onChange={e => this.changeStyle(e, 'color')}>
              <option value="tomato">Tomato</option>
              <option value="gold">Gold</option>
              <option value="orange">Orange</option>
              <option value="#f77">Salmon</option>
              <option value="#55e">Purple</option>
              <option value="#8af">Periwinkle</option>
            </select>

            <p>Pointer:</p>
            <select onChange={e => this.changeStyle(e, 'tooltip')}>
              <option value={5}>Round edge</option>
              <option value={0}>Square</option>
              <option value={25}>Circle</option>
            </select>

            <p>Graph Title:</p>
            <input
              value={this.state.title}
              onChange={e => this.changeStyle(e, 'title')}
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

export default connect(mapStateToProps)(VictoryLineGraph)
