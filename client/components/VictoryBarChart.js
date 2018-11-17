import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
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

class VictoryBarChart extends Component {
  constructor() {
    super()
    this.state = {
      color: 'tomato',
      column: null,
      title: '',
      highlight: 'orange',
      tooltip: '5'
    }
    // this.columnChange = this.columnChange.bind(this)
    // this.addTitle = this.addTitle.bind(this)
    this.changeStyle = this.changeStyle.bind(this)
    this.downloadPNG = this.downloadPNG.bind(this)
    // this.changeHighlight = this.changeHighlight.bind(this)
  }

  componentDidMount() {
    //fetchData
  }

  changeStyle(e, attribute) {
    this.setState({
      [attribute]: e.target.value
    })
  }

  addComma(stringNum) {
    if (stringNum.length > 3) {
      return `${stringNum.slice(0, stringNum.length - 3)},${stringNum.slice(
        stringNum.length - 3
      )}`
    }
  }

  downloadPNG(title) {
    //draw canvas
    let svgHtml = ReactDOM.findDOMNode(this).querySelector('svg')
    var svgString = new XMLSerializer().serializeToString(svgHtml)
    const canvas = ReactDOM.findDOMNode(this).querySelector('canvas')
    var ctx = canvas.getContext('2d')
    var DOMURL = window.self.URL || window.self.webkitURL || window.self
    var img = new Image()
    var svg = new Blob([svgString], {type: 'image/svg+xml;charset=utf-8'})
    var url = DOMURL.createObjectURL(svg)
    img.src = url

    //function executes when image loads
    img.onload = function() {
      ctx.drawImage(img, 0, 0)
      var png = canvas.toDataURL('image/png')
      document.querySelector('canvas').innerHTML = '<img src="' + png + '"/>'
      DOMURL.revokeObjectURL(png)

      //download png
      const canvas2 = document.getElementsByTagName('canvas')[0]
      let URL = canvas2.toDataURL('image/png')
      let link = document.createElement('a')
      link.href = URL
      link.download = title ? title + '.png' : 'chart.png'

      document.body.appendChild(link)
      link.click()
    }
  }

  render() {
    if (!data) {
      return 'Loading...'
    } else {
      let keys = Object.keys(data[0])
      let column = this.state.column || keys[1]
      // let barWidth = 500/(data.length * 1.25) - 60
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
              <VictoryStack>
                <VictoryBar
                  labelComponent={
                    <VictoryTooltip
                      flyoutStyle={{fill: 'white', stroke: 'lightgrey'}}
                      cornerRadius={+this.state.tooltip}
                    />
                  }
                  style={{data: {fill: this.state.color}}}
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
                                style: {fill: this.state.highlight}
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
                    let label = datum[column].toString()
                    label = this.addComma(label) || label
                    datum.label = label
                    return datum
                  })}
                  x={keys[0]}
                  y={column}
                  barRatio={0.9}
                />
              </VictoryStack>
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

            <p>Bar Color:</p>
            <select onChange={e => this.changeStyle(e, 'color')}>
              <option value="tomato">Tomato</option>
              <option value="gold">Gold</option>
              <option value="orange">Orange</option>
              <option value="#f77">Salmon</option>
              <option value="#55e">Purple</option>
              <option value="#8af">Periwinkle</option>
            </select>

            <p>Bar Highlight:</p>
            <select onChange={e => this.changeStyle(e, 'highlight')}>
              <option value="orange">Orange</option>
              <option value="tomato">Tomato</option>
              <option value="gold">Gold</option>
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
            <p>
              <button onClick={() => this.downloadPNG(this.state.title)}>
                Download
              </button>
            </p>
          </div>
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
}

const mapStateToProps = state => ({
  data: state.user.data
})

export default connect(mapStateToProps)(VictoryBarChart)
