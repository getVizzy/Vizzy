import React from 'react'
import PropTypes from 'prop-types'
import BarChart from '../VictoryBarChart'
import {gotData} from '../../store/data'
import classNames from 'classnames'
import GraphMenu from './GraphMenu'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'

import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'

let allData = [
  {quarter: '1', earnings: 13000, items: 40000, state: 'NY'},
  {quarter: '2', earnings: 16500, items: 60000, state: 'NY'},
  {quarter: '3', earnings: 15340, items: 30000, state: 'NY'},
  {quarter: '4', earnings: 18000, items: 70000, state: 'NY'}
]

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

class EditView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      graphSelected: 'bar',
      color: 'tomato',
      title: '',
      highlight: 'orange',
      tooltip: '5',
      x: '',
      y: '',
      dataId: 0
    }
    this.handleGraphSelected = this.handleGraphSelected.bind(this)
    this.changeStyle = this.changeStyle.bind(this)
    this.downloadPNG = this.downloadPNG.bind(this)
    // this.addComma = this.addComma.bind(this)
    // this.getDataSlice = this.getDataSlice.bind(this)
  }

  componentDidMount() {
    this.props.gotData()
  }

  changeStyle(e, attribute) {
    if (attribute === 'dataId') {
      this.setState({
        [attribute]: +e.target.value
      })
    } else {
      this.setState({
        [attribute]: e.target.value
      })
    }
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

  handleGraphSelected(graph) {
    this.setState({graphSelected: graph})
  }

  render() {
    // console.log('did thunk work data', this.props.data)
    const {classes} = this.props
    const graphSelected = this.state.graphSelected
    let data
    if (!this.props.data) {
      return 'Loading...'
    } else {
      if (this.state.dataId === 0) {
        data = [
          {quarter: '1', earnings: 13000, items: 40000, state: 'NY'},
          {quarter: '2', earnings: 16500, items: 60000, state: 'NY'},
          {quarter: '3', earnings: 15340, items: 30000, state: 'NY'},
          {quarter: '4', earnings: 18000, items: 70000, state: 'NY'}
        ]
      } else {
        let dataElem = this.props.data.filter(
          elem => elem.id === this.state.dataId
        )
        console.log(dataElem, 'dataElem')
        data = dataElem[0].dataJSON.data
        console.log('data after datajson', data)
      }
      return (
        <div>
          <Paper className={classes.root} elevation={22}>
            <Typography variant="h5" component="h3">
              Edit Graph
            </Typography>
            <Typography component="p">Some text</Typography>
            {this.state.x === '' || this.state.y === '' ? (
              <div>Select columns</div>
            ) : graphSelected === 'bar' ? (
              <BarChart
                color={this.state.color}
                title={this.state.title}
                highlight={this.state.highlight}
                tooltip={this.state.tooltip}
                x={this.state.x}
                y={this.state.y}
                changeStyle={this.changeStyle}
                data={data}
                downloadPNG={this.downloadPNG}
                addComma={this.addComma}
              />
            ) : graphSelected === 'line' ? (
              <BarChart />
            ) : null}
            <GraphMenu handleGraphSelected={this.handleGraphSelected} />
            <Button variant="contained" size="small" className={classes.button}>
              <SaveIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Save
            </Button>
          </Paper>

          <div id="controls">
            <p>Choose a Dataset:</p>
            <select onChange={e => this.changeStyle(e, 'dataId')}>
              <option />
              {this.props.data.map((elem, i) => (
                <option key={i} value={elem.id}>
                  {elem.id}
                </option>
              ))}
            </select>
            <p>Left Axis:</p>
            <select onChange={e => this.changeStyle(e, 'y')}>
              <option />
              {Object.keys(data[0]).map((key, i) => (
                <option key={i} value={key}>
                  {key}
                </option>
              ))}
            </select>

            <p>Bottom Axis:</p>
            <select onChange={e => this.changeStyle(e, 'x')}>
              <option />
              {Object.keys(data[0]).map((key, i) => (
                <option key={i} value={key}>
                  {key}
                </option>
              ))}
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
          </div>
        </div>
      )
    }
  }
}

EditView.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => ({
  gotData: function() {
    dispatch(gotData())
  }
})

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(EditView)
)
