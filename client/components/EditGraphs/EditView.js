import React from 'react'
import PropTypes from 'prop-types'
import {fetchAllUsers} from '../../store/user'
import ChartContainer from '../Chart/ChartContainer'
import {CustomizeMenu} from './CustomizeMenu'
import {gotData} from '../../store/data'
import {postGraph} from '../../store/graph'
const io = require('socket.io-client')
const socket = io()
import classNames from 'classnames'
import GraphMenu from './GraphMenu'
import {connect} from 'react-redux'
import {reinstateNumbers, download, addComma} from '../../utils'
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

const sampleData = {
  dataJSON: {
    data: [
    {quarter: '1', earnings: 13, items: 40, state: 'NY'},
    {quarter: '2', earnings: 16, items: 60, state: 'NY'},
    {quarter: '3', earnings: 17, items: 70, state: 'NY'},
    {quarter: '4', earnings: 18, items: 80, state: 'NY'},
    {quarter: '4', earnings: 18, items: 81, state: 'NY'},
    {quarter: '4', earnings: 19, items: 90, state: 'NY'}
  ]
}
}

class EditView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      graphSelected: 'line',
      color: 'tomato',
      title: '',
      highlight: 'orange',
      tooltip: '5',
      x: '',
      y: '',
      regression: false,
      regressionLine: [],
      regressionModel: {},
      dataId: '0',
      zoomDomain: {
        x: [new Date(2018, 1, 1), new Date(2018, 12, 1)]
      },
      pieColor: ["#d73027", "#fc8d59", "#fee090", "#e0f3f8", "#91bfdb", "#4575b4"]
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
      let newId = e.target.value;
      if(newId !== '0') {
        newId = +e.target.value
      }
      this.setState({
        [attribute]: newId,
        graphSelected: 'line',
        color: 'tomato',
        title: '',
        highlight: 'orange',
        tooltip: '5',
        x: '',
        y: '',
        regression: false,
        regressionLine: [],
        columnOption: '',
        regressionModel: {},
        message: 'Choose a column',
      })
    } else if (attribute === 'pieColor') {
      let pieColorSelected = e.target.value.split(",")
      this.setState({
        pieColor: pieColorSelected
      });
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
    const {classes} = this.props
    console.log('user', this.props.user)

    const matchingUser = this.props.allUsers.filter(user => {
      return user.roomKey === this.props.singleRoom
    })
    const dataMatch = matchingUser[0].data
    console.log('theeeee state', this.state)
    const graphSelected = this.state.graphSelected
    let data;

    if (!dataMatch) {
      return 'Loading...'
    } else {
      if (this.state.dataId === '0') {
        data = sampleData.dataJSON.data;
      } else {
        let dataElem = dataMatch.filter(elem => {
          return elem.id === +this.state.dataId
        })
        console.log('dataElem', dataElem)

        if (dataElem.length === 0) {
          data = sampleData.dataJSON.data;
        } else {
          data = reinstateNumbers(dataElem[0].dataJSON.data)
        }
      }

      let propPackage = {
        ...this.state,
        downloadPNG: download,
        addComma: addComma,
        changeStyle: this.changeStyle,
        data: data
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
            <CustomizeMenu
              {...this.state}
              {...this.props}
              changeStyle={this.changeStyle}
              graphData={data}
              owner={matchingUser}
              user={this.props.user}
              dataMatch={dataMatch}
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
  },
  addGraph: function(graphData) {
    dispatch(postGraph(graphData))
  },
  onFetchAllUsers: () => dispatch(fetchAllUsers())
})

const mapStateToProps = state => ({
  data: state.data,
  user: state.user.user,
  rooms: state.room.rooms,
  singleRoom: state.room.singleRoom,
  allUsers: state.user.allUsers
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(EditView)
)
