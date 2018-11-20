import ReactDOM from 'react-dom'

export function reinstateNumbers(array) {
  let restoredData = array.map(data => {
    let newFormat = {};
    let alpha = "abcdefghijklmnopqrstuvwxyz!#/@^*()"
    for(let key in data) {
      let value = data[key]
      if(!value.split("").some(char =>
        alpha.includes(char.toLowerCase()))
        &&
        (value.indexOf('-') === -1 || (value.indexOf('-') === 0 && value.split("").filter(elem => elem === '-').length === 1 ))) {
          newFormat[key] = +value;
      } else {
        newFormat[key] = value;
      }
    }
    return newFormat;
  })
  return restoredData;
}

export function download(title) {
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

export function addComma(stringNum) {
  if (stringNum.length > 3) {
    return `${stringNum.slice(0, stringNum.length - 3)},${stringNum.slice(
      stringNum.length - 3
    )}`
  }
}
