import React from 'react'
import PropTypes from 'prop-types'
import ChartContainer from '../ChartContainer'
import BarChart from '../VictoryBarChart'
import ScatterChart from '../VictoryScatterChart'
import LineChart from '../VictoryLineGraph'
import {gotData} from '../../store/data'
import {postGraph} from '../../store/graph'
import {fetchAllUsers} from '../../store/user'
const io = require('socket.io-client')
const socket = io()
import classNames from 'classnames'
import GraphMenu from './GraphMenu'
import {connect} from 'react-redux'
import {
  reinstateNumbers,
  download,
  addComma,
  buildRegressionModel
} from '../../utils'
import {withStyles} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import SaveIcon from '@material-ui/icons/Save'
import Button from '@material-ui/core/Button'

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
      graphSelected: 'scatter',
      color: 'tomato',
      title: '',
      highlight: 'orange',
      tooltip: '5',
      x: '',
      y: '',
      regression: false,
      regressionLine: [],
      regressionModel: {},
      dataId: 0,
      zoomDomain: {
        x: [new Date(2018, 1, 1), new Date(2018, 12, 1)]
      }
    }
    socket.on('receive code', payload => {
      this.updateCodeFromSockets(payload)
    })
    this.handleGraphSelected = this.handleGraphSelected.bind(this)
    this.changeStyle = this.changeStyle.bind(this)
    // this.downloadPNG = download.bind(this)
  }

  async componentDidMount() {
    await this.props.onFetchAllUsers()
    await this.props.gotData()
  }

  changeStyle(e, attribute) {
    if (attribute === 'dataId') {
      // await this.setState({
      //   x: '',
      //   y: ''
      // })
      this.setState({
        [attribute]: +e.target.value,
        graphSelected: 'scatter',
        color: 'tomato',
        title: '',
        highlight: 'orange',
        tooltip: '5',
        x: '',
        y: '',
        regression: false,
        regressionLine: [],
        regressionModel: {}
      })
    } else if (!e.target) {
      this.setState({
        [attribute]: e
      })
      socket.emit('new changes', this.props.singleRoom, {
        [attribute]: e
      })
    } else {
      this.setState({
        [attribute]: e.target.value
      })
    }
    if (e.target) {
      socket.emit('new changes', this.props.singleRoom, {
        [attribute]: e.target.value
      })
    }
  }

  updateCodeFromSockets(payload) {
    this.setState(payload)
  }

  handleGraphSelected(graph) {
    this.setState({graphSelected: graph})
    socket.emit('new changes', this.props.singleRoom, {
      graphSelected: graph
    })
  }

  render() {
    const matchingUser = this.props.allUsers.filter(user => {
      return user.roomKey === this.props.singleRoom
    })
    const dataMatch = matchingUser[0].data

    console.log('dataMatch from new model', dataMatch)

    console.log('this.props.data', this.props.data)

    const {classes} = this.props
    const graphSelected = this.state.graphSelected
    let data

    if (!dataMatch) {
      return 'Loading...'
    } else {
      console.log('after first else')

      if (this.state.dataId === 0) {
        console.log('after first if')

        data = [
          {quarter: '1', earnings: 13, items: 40, state: 'NY'},
          {quarter: '2', earnings: 16, items: 60, state: 'NY'},
          {quarter: '3', earnings: 17, items: 70, state: 'NY'},
          {quarter: '4', earnings: 18, items: 80, state: 'NY'},
          {quarter: '4', earnings: 18, items: 81, state: 'NY'},
          {quarter: '4', earnings: 19, items: 90, state: 'NY'}
        ]
      } else {
        console.log('data matchh 2nd line', dataMatch)
        console.log('elseeee')
        let dataElem = dataMatch.filter(elem => {
          console.log('FILTER- datamatch in the datafilter', dataMatch)
          console.log('FILTER_elem', elem)
          console.log('FiLTER-elemID', elem.id)
          console.log('FILTER-this.state.id', this.state.dataId)
          return elem.id === +this.state.dataId
        })

        console.log('thisstate.data', this.state.dataId)

        console.log('dataElem', dataElem)
        if (dataElem.length === 0) {
          console.log('no dataElem here')
        } else {
          data = reinstateNumbers(dataElem[0].dataJSON.data)
        }

        console.log('data', data)
        console.log('this.state.y', this.state.y)
        console.log('this.state.x', this.state.x)
      }

      let propPackage = {
        ...this.state,
        downloadPNG: download,
        addComma: addComma,
        changeSyle: this.changeStyle,
        data: data
      }
      if (!data) {
        return 'no data here either!'
      }
      return (
        <div>
          <div>Room ID: {this.props.singleRoom}</div>

          <Paper className={classes.root} elevation={22}>
            <Typography variant="h5" component="h3">
              Edit Graph
            </Typography>
            <Typography component="p">Some text</Typography>
            {this.state.x === '' || this.state.y === '' ? (
              <div>Select columns</div>
            ) : (
              <ChartContainer {...propPackage} />
            )}

            {/* /* Commented out the code below after adding refactoring above, but check with Grace on linear regression functionality before deleting
            // graphSelected === 'bar' ? (
            //   <BarChart
            //     color={this.state.color}
            //     title={this.state.title}
            //     highlight={this.state.highlight}
            //     tooltip={this.state.tooltip}
            //     x={this.state.x}
            //     y={this.state.y}
            //     changeStyle={this.changeStyle}
            //     data={data}
            //     downloadPNG={this.downloadPNG}
            //     addComma={addComma}
            //   />
            // ) : graphSelected === 'scatter' ? (
            //   <ScatterChart
            //     color={this.state.color}
            //     title={this.state.title}
            //     highlight={this.state.highlight}
            //     tooltip={this.state.tooltip}
            //     x={this.state.x}
            //     y={this.state.y}
            //     changeStyle={this.changeStyle}
            //     data={data}
            //     downloadPNG={this.downloadPNG}
            //     regressionLine={this.state.regressionLine}
            //   />
            // ) : graphSelected === 'line' ? (
            //   <LineChart
            //     color={this.state.color}
            //     title={this.state.title}
            //     highlight={this.state.highlight}
            //     tooltip={this.state.tooltip}
            //     x={this.state.x}
            //     y={this.state.y}
            //     changeStyle={this.changeStyle}
            //     data={data}
            //     downloadPNG={this.downloadPNG}
            //   />
            // ) : null} */}
            <GraphMenu handleGraphSelected={this.handleGraphSelected} />
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={() => this.props.addGraph(this.state)}
            >
              <SaveIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Save
            </Button>
          </Paper>

          <div id="controls">
            <p>Choose a Dataset:</p>
            <select name="dataId" onChange={e => this.changeStyle(e, 'dataId')}>
              <option />
              {dataMatch.map((elem, i) => (
                <option key={i} value={elem.id}>
                  {elem.id}
                </option>
              ))}
            </select>
            <p>Left Axis:</p>
            <select name="y" onChange={e => this.changeStyle(e, 'y')}>
              <option />
              {Object.keys(data[0]).map((key, i) => (
                <option key={i} value={key}>
                  {key}
                </option>
              ))}
            </select>

            <p>Bottom Axis:</p>
            <select name="x" onChange={e => this.changeStyle(e, 'x')}>
              <option />
              {Object.keys(data[0]).map((key, i) => (
                <option key={i} value={key}>
                  {key}
                </option>
              ))}
            </select>

            <p>Color:</p>
            <select name="color" onChange={e => this.changeStyle(e, 'color')}>
              <option value="tomato">Tomato</option>
              <option value="gold">Gold</option>
              <option value="orange">Orange</option>
              <option value="#f77">Salmon</option>
              <option value="#55e">Purple</option>
              <option value="#8af">Periwinkle</option>
            </select>
            {graphSelected === 'line' ? (
              ''
            ) : (
              <div>
                <p>Highlight:</p>
                <select
                  name="highlight"
                  onChange={e => this.changeStyle(e, 'highlight')}
                >
                  <option value="orange">Orange</option>
                  <option value="tomato">Tomato</option>
                  <option value="gold">Gold</option>
                  <option value="#f77">Salmon</option>
                  <option value="#55e">Purple</option>
                  <option value="#8af">Periwinkle</option>
                </select>
              </div>
            )}

            <p>Pointer:</p>
            <select
              name="tooltip"
              onChange={e => this.changeStyle(e, 'tooltip')}
            >
              <option value={5}>Round edge</option>
              <option value={0}>Square</option>
              <option value={25}>Circle</option>
            </select>

            <p>Graph Title:</p>
            <input
              value={this.state.title}
              onChange={e => this.changeStyle(e, 'title')}
            />
            {graphSelected === 'scatter' ? (
              <p>
                Regression Line:{' '}
                <input
                  type="checkbox"
                  onChange={async e => {
                    await this.changeStyle(!this.state.regression, 'regression')
                    console.log('x and y on state', this.state.x, this.state.y)
                    if (this.state.regression) {
                      buildRegressionModel(
                        data,
                        this.state.x,
                        this.state.y,
                        this.changeStyle
                      )
                    } else {
                      this.changeStyle([], 'regressionLine')
                    }
                  }}
                />
              </p>
            ) : (
              ''
            )}
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
  },
  addGraph: function(graphData) {
    dispatch(postGraph(graphData))
  },
  onFetchAllUsers: () => dispatch(fetchAllUsers())
})

const mapStateToProps = state => ({
  data: state.data,
  rooms: state.room.rooms,
  singleRoom: state.room.singleRoom,
  allUsers: state.user.allUsers
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(EditView)
)
