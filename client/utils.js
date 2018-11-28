import ReactDOM from 'react-dom'
import * as tf from '@tensorflow/tfjs'

export function reinstateNumbers(array) {
  let restoredData = array.map(data => {
    let newFormat = {}
    let alpha = 'abcdefghijklmnopqrstuvwxyz!#/@^*()'
    for (let key in data) {
      let value = data[key]
      if (
        !value.split('').some(char => alpha.includes(char.toLowerCase())) &&
        (value.indexOf('-') === -1 ||
          (value.indexOf('-') === 0 &&
            value.split('').filter(elem => elem === '-').length === 1))
      ) {
        newFormat[key] = +value
      } else {
        newFormat[key] = value
      }
    }
    return newFormat
  })
  return restoredData
}

export function download(title, id) {
  //draw canvas
  let svgHtml = ReactDOM.findDOMNode(this).querySelector('svg')
  var svgString = new XMLSerializer().serializeToString(svgHtml)
  const canvas = ReactDOM.findDOMNode(this).querySelector('canvas')
  // const canvas = this.canvas.current
  var ctx = canvas.getContext('2d')
  var DOMURL = window.self.URL || window.self.webkitURL || window.self
  var img = new Image()
  var svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  var url = DOMURL.createObjectURL(svg)
  img.src = url

  //function executes when image loads
  img.onload = function () {
    ctx.drawImage(img, 0, 0)
    var png = canvas.toDataURL('image/png')
    document.querySelector('canvas').innerHTML = '<img src="' + png + '"/>'
    DOMURL.revokeObjectURL(png)

    //download png
    const canvas2 = document.getElementById(id)
    let URL = canvas2.toDataURL('image/png')
    let link = document.createElement('a')
    link.href = URL
    link.download = title ? title + '.png' : 'chart.png'

    document.body.appendChild(link)
    link.click()
  }
}

export function addComma(stringNum) {
  if (stringNum.length > 3) {
    return `${stringNum.slice(0, stringNum.length - 3)},${stringNum.slice(
      stringNum.length - 3
    )}`
  }
}

export function buildRegressionModel(data, xCol, yCol, setStateFunction) {
  //there are different tensor types for different tensor dimensions
  const yData = data.map(elem => elem[yCol])
  const xData = data.map(elem => elem[xCol])

  const ys = tf.tensor1d(yData)
  const xs = tf.tensor1d(xData)
  console.log(ys.dataSync(), 'ys')
  console.log(xs.dataSync(), 'xs')
  //in tensorflow, variables can be mutated. We will be changing the values of these variables when we run the optimizer. Here we make a scalar and turn it into a variable so we can change it.
  let m = tf.scalar(Math.random()).variable()
  let b = tf.scalar(Math.random()).variable()

  //define your model, y=mx + b
  //The tensorflow library provides mathematical operation methods to tensors that facilitate things like multiplication or addition of tensors.
  const model = x => m.mul(x).add(b)

  //determine how quickly to adjust the model
  const learningRate = 0.01
  const optimizer = tf.train.adam(learningRate)

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

  //the datasync method returns the tensor data in the form of an array. We access it with using this dataSync method.
  const x = xs.dataSync()
  const y = ys.dataSync()
  //start and end points of regression line
  const x1 = Math.min(...x)

  const y_pred_1 = model(x1).dataSync()[0]
  const x2 = Math.max(...x)
  const y_pred_2 = model(x2).dataSync()[0]
  const regressionLine = [
    { [xCol]: x1, [yCol]: y_pred_1 },
    { [xCol]: x2, [yCol]: y_pred_2 }
  ]

  console.log('regressionLine', regressionLine, 'datasync x1', y_pred_1)
  setStateFunction(regressionLine, 'regressionLine')
  setStateFunction(model, 'regressionModel')
}
