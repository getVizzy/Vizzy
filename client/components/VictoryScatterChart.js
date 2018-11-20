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
import * as tf from '@tensorflow/tfjs'
import ReactFauxDOM from 'react-faux-dom'
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
// const xs = tf.tensor1d([1, 2, 3, 4, 5, 6, 7, 8])
// const ys = tf.tensor1d([2, 2, 4, 3, 4.5, 4.5, 7, 10])

export default class VictoryScatterChart extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     color: 'tomato',
  //     x: null,
  //     y: null,
  //     title: '',
  //     highlight: 'orange',
  //     tooltip: '5',
  //     regression: false,
  //     regressionLine: []
  //   }
  // this.buildRegressionModel = this.buildRegressionModel.bind(this)
  //}

  buildRegressionModel(data, xCol, yCol, setStateFunction) {
    //there are different tensor types for different tensor dimensions
    const yData = data.map(elem => elem[xCol])
    const xData = data.map(elem => elem[yCol])
    console.log('xData', xData, 'yData', yData)
    const ys = tf.tensor1d(yData)
    const xs = tf.tensor1d(xData)

    //in tensorflow, variables can be mutated. We will be changing the values of these variables when we run the optimizer. Here we make a scalar and turn it into a variable so we can change it.
    let m = tf.scalar(Math.random()).variable()
    let b = tf.scalar(Math.random()).variable()

    //define your model, y=mx + b
    //The tensorflow library provides mathematical operation methods to tensors that facilitate things like multiplication or addition of tensors.
    const model = x => m.mul(x).add(b)

    //determine how quickly to adjust the model
    const learningRate = 0.01
    const optimizer = tf.train.sgd(learningRate)

    //pred are the y values predicted by your model.
    //actual is the actual y values in the dataset.
    const loss = (pred, actual) =>
      pred
        .sub(actual)
        .square()
        .mean()
    //here, we train the model. With each loop, the model is adjusted to minimize the output of our loss function.

    for (let i = 0; i < 10; ++i) {
      optimizer.minimize(() => loss(model(xs), ys))
    }

    const modelPredictedValues = model(xs).dataSync()

    //the datasync method returns the tensor data in the form of an array. We access it with using this dataSync method.
    const x = xs.dataSync()
    const y = ys.dataSync()

    //start and end points of regression line
    const x1 = x[0]
    const y_pred_1 = modelPredictedValues[0]
    const x2 = x[x.length - 1]
    const y_pred_2 = modelPredictedValues[x.length - 1]
    const regressionLine = [
      {[xCol]: x1, [yCol]: y_pred_1},
      {[xCol]: x2, [yCol]: y_pred_2}
    ]
    console.log(regressionLine, 'regressionLine')
    changeStyle(regressionLine, 'regressionLine')
    changeStyle(model, 'regressionModel')
  }

  render() {
    let data = this.props.data
    const changeStyle = this.props.changeStyle
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
              <VictoryLine
                data={this.state.regressionLine}
                x={x}
                y={y}
                // animate={{
                //   duration: 2000,
                //   onLoad: {duration: 1000}
                // }}
              />
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
            </select>

            <button onClick={() => this.props.downloadPNG(this.state.title)}>
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
}
