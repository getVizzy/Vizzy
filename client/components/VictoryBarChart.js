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

let allData = [
  {quarter: '1', earnings: '13000', items: '40000', state: 'NY' },
  {quarter: '1', earnings: '18000', items: '80000', state: 'NJ'},
  {quarter: '1', earnings: '21000', items: '90000', state: 'CT'},
  {quarter: '2', earnings: '16500', items: '60000', state: 'NY' },
  {quarter: '2', earnings: '17500', items: '75000', state: 'NJ' },
  {quarter: '2', earnings: '14500', items: '50000', state: 'CT' },
  {quarter: '3', earnings: '15340', items: '30000', state: 'NY' },
  {quarter: '3', earnings: '16250', items: '35000', state: 'NJ' },
  {quarter: '3', earnings: '8250', items: '12000', state: 'CT' },
  {quarter: '4', earnings: '18000', items: '70000', state: 'NY'},
  {quarter: '4', earnings: '17500', items: '69000', state: 'NJ'},
  {quarter: '4', earnings: '13000', items: '50000', state: 'CT'}
];

//This is just to set up the initial render for the dummy data. These two lines won't be necessary once we separate the chart and editing components (and are pulling in real data).
let keys = Object.keys(allData[0])
console.log("KEYS", keys[0], keys[1])

class VictoryBarChart extends Component {
  constructor() {
    super()
    this.state = {
      color: 'tomato',
      title: '',
      highlight: 'orange',
      tooltip: '5',
      x: keys[0],
      y: keys[1]
    }
    this.reinstateNumbers = this.reinstateNumbers.bind(this)
    this.changeStyle = this.changeStyle.bind(this)
    this.downloadPNG = this.downloadPNG.bind(this)
    this.getDataSlice = this.getDataSlice.bind(this)
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


  getDataSlice(data, x, y) {
    let dataSlice = [];
    let dataObj = {};
    data.forEach(datum => {
      if(dataObj[datum[x]]) {
        dataObj[datum[x]] = dataObj[datum[x]] + +datum[y];
      } else {
        dataObj[datum[x]] = +datum[y];
      }
    })
    for(let key in dataObj) {
      dataSlice.push({ [x]: key, [y]: dataObj[key] })
    }
    return dataSlice;
  }

  reinstateNumbers(array) {
    let restoredData = array.map(dataObj => {
      let numDataObj = {};
      let alpha = "abcdefghijklmnopqrstuvwxyz"
      for(let key in dataObj) {
        if(!dataObj[key].split("").some(char => alpha.includes(char.toLowerCase()))) {
          numDataObj[key] = +dataObj[key]
        } else {
          numDataObj[key] = dataObj[key]
        }
      }
      return numDataObj;
    })
    return restoredData;
  }

  render() {
    if(!allData) {
      return (
        "Loading..."
      )
    } else {
      let data = this.reinstateNumbers(allData);
      data = this.getDataSlice(data, this.state.x, this.state.y)
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
                label={this.state.x}
                style={{
                  axis: {stroke: '#756f6a'},
                  axisLabel: {fontSize: 12, padding: 30}
                }}
                tickValues={data.map(datum => datum[this.state.x])}
                tickFormat={data.map(datum => {
                  if (typeof datum[this.state.x] === 'string') {
                    return datum[this.state.x].slice(0, 3)
                  } else {
                    return datum[this.state.x]
                  }
                })}
              />

              <VictoryAxis
                dependentAxis
                label={this.state.y}
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
                    let label = datum[this.state.y].toString()
                    label = this.addComma(label) || label
                    datum.label = label
                    return datum
                  })}
                  x={this.state.x}
                  y={this.state.y}
                  barRatio={0.9}
                />
              </VictoryStack>
            </VictoryChart>
          </div>

          <div id="controls">
            <p>Left Axis:</p>
            <select onChange={e => this.changeStyle(e, 'y')}>
              <option />
              {Object.keys(allData[0]).map((key, i) =>
                <option key={i} value={key}>{key}</option>
              )}
            </select>

            <p>Bottom Axis:</p>
            <select onChange={e => this.changeStyle(e, 'x')}>
              <option />
              {Object.keys(allData[0]).map((key, i) =>
                <option key={i} value={key}>{key}</option>
              )}
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
