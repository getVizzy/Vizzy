import React from 'react'
import PropTypes from 'prop-types'
import { fetchAllUsers } from '../../store/user'
import ChartContainer from '../Chart/ChartContainer'
import { gotData } from '../../store/data'
import { postGraph } from '../../store/graph'
const io = require('socket.io-client')
const socket = io()
import Menu from './Menu'
import { connect } from 'react-redux'
import { reinstateNumbers, download, addComma } from '../../utils'
import { withStyles } from '@material-ui/core/styles'
import Snackbar from '../Notifications/Snackbar'

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
      { quarter: '1', earnings: 13, items: 40, state: 'NY' },
      { quarter: '2', earnings: 16, items: 60, state: 'NY' },
      { quarter: '3', earnings: 17, items: 70, state: 'NY' },
      { quarter: '4', earnings: 18, items: 80, state: 'NY' },
      { quarter: '4', earnings: 18, items: 81, state: 'NY' },
      { quarter: '4', earnings: 19, items: 90, state: 'NY' }
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
      pieColor: [
        '#d73027',
        '#fc8d59',
        '#fee090',
        '#e0f3f8',
        '#91bfdb',
        '#4575b4'
      ],
      pieTransformation: 'normal',
      notification: false,
      userThatLeft: '',
      userThatJoined: '',
      message: '',
      styleNotification: false,
      saveNotification: false
    }

    this.changeStyle = this.changeStyle.bind(this)
    this.leaveRoom = this.leaveRoom.bind(this)
    this.leaveNotification = this.leaveNotification.bind(this)
    this.joinNotification = this.joinNotification.bind(this)
    this.styleNotification = this.styleNotification.bind(this)
    this.resetSnackbar = this.resetSnackbar.bind(this)
    this.titleChange = this.titleChange.bind(this)
    this.titleSubmit = this.titleSubmit.bind(this)
    this.saveNotification = this.saveNotification.bind(this)
  }

  async componentDidMount() {
    await this.props.onFetchAllUsers()
    await this.props.gotData()

    socket.emit('joinRoom', this.props.singleRoom, this.props.user)

    socket.on('receiveJoinRoom', user => {
      this.joinNotification(user)
    })

    socket.on('receiveLeaveRoom', user => {
      this.leaveNotification(user)
    })
    //moved receiveCode socket from constructor to componentDidMount per Dan's rec, observed no difference
    socket.on('receiveCode', payload => {
      this.updateCodeFromSockets(payload)
    })
  }

  changeStyle(e, attribute) {
    let updated;
    e && e.target ? (updated = e.target.value) : (updated = e)
    switch (attribute) {
      case 'dataId':
        if (updated !== '0') {
          updated = +e
        }
        this.setState({
          [attribute]: updated,
          graphSelected: 'line',
          title: '',
          x: '',
          y: '',
          regression: false,
          regressionLine: [],
          regressionModel: {}
        })
        break
      case 'pieColor':
        this.setState({
          pieColor: updated
        })
        break
      case 'pieTransformation':
        this.setState({
          pieTransformation: updated.toLowerCase()
        });
        break
      default:
        this.setState({
          [attribute]: updated
        })
    }
    let change = {
      [attribute]: updated
    }

    if (attribute === 'dataId') {
      change.graphSelected = 'line'
    }
    socket.emit('newChanges', this.props.singleRoom, change)
  }

  styleNotification(attribute, updated) {
    let message
    switch (attribute) {
      case 'x':
        message = `X axis changed to ${updated}`
        break
      case 'y':
        message = `Y axis changed to ${updated}`
        break
      case 'dataId':
        message = 'New dataset selected'
        break
      case 'graphSelected':
        message = `Graph changed to ${updated}`
        break
      case 'color':
        message = `Color changed`
        break
      case 'tooltip':
        message = `Tooltip shape changed`
        break
      default:
        message = `${attribute[0].toUpperCase()}${attribute.slice(
          1
        )} updated to ${updated}`
    }

    this.setState({
      message: message,
      styleNotification: !this.state.styleNotification
    })
  }

  titleChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  titleSubmit(e) {
    this.changeStyle(this.state.title, 'title')
  }

  updateCodeFromSockets(payload) {
    this.setState(payload)
    let attribute = Object.keys(payload)[0]
    let updated = Object.values(payload)[0]
    this.styleNotification(attribute, updated)
  }

  leaveRoom() {
    socket.emit('leaveRoom', this.props.singleRoom, this.props.user)
    this.props.history.push('/home')
  }

  leaveNotification(user) {
    if (!this.state.notification) {
      this.setState({
        notification: true,
        userThatLeft: user.email
      })
    } else {
      this.setState({
        notification: false,
        userThatLeft: ''
      })
    }
  }

  joinNotification(user) {
    if (!this.state.notification) {
      this.setState({
        notification: true,
        userThatJoined: user.email
      })
    } else {
      this.setState({
        notification: false,
        userThatJoined: ''
      })
    }
  }

  saveNotification() {
    this.setState({
      saveNotification: true
    })
  }

  resetSnackbar() {
    this.setState({
      styleNotification: false,
      saveNotification: false
    })
  }

  render() {
    const { classes } = this.props

    const matchingUser = this.props.allUsers.filter(user => {
      return user.roomKey === this.props.singleRoom
    })

    if (matchingUser[0]) {

      const dataMatch = matchingUser[0].data
      let data;

      if (!dataMatch) {
        return 'Loading...'
      } else {
        if (this.state.dataId === '0') {
          data = sampleData.dataJSON.data
        } else {
          let dataElem = dataMatch.filter(elem => {
            return elem.id === +this.state.dataId
          })

          if (dataElem.length === 0) {
            data = sampleData.dataJSON.data
          } else {
            data = reinstateNumbers(dataElem[0].dataJSON.data)
          }
        }

        let propPackage = {
          ...this.state,
          downloadPNG: download,
          addComma: addComma,
          changeStyle: this.changeStyle,
          data: data,
          user: this.props.user.user,
          titleChange: this.titleChange,
          titleSubmit: this.titleSubmit,
          graphData: data,
          dataMatch: dataMatch,
          handleGraphSelected: this.changeStyle,
          state: this.state,
          leaveRoom: this.leaveRoom,
          saveNotification: this.saveNotification,
          addGraph: this.props.addGraph
        }

        let notificationProps = {
          notification: this.state.notification,
          userThatJoined: this.state.userThatJoined,
          userThatLeft: this.state.userThatLeft,
          joinNotification: this.joinNotification,
          leaveNotification: this.leaveNotification,
          resetSnackbar: this.resetSnackbar
        }

        return (
          <div id="globalEdit">
            <div id="edit">
              <div id="editChart">
                <div style={{height: '500px'}}>
                  {this.state.x === '' || this.state.y === '' ? (
                      ''
                    ) : (
                        <ChartContainer {...propPackage} />
                      )}
                </div>
              </div>

              <div id="editMenu">
                <Menu {...propPackage } />
              </div>
            </div>

            <div>
              {this.state.styleNotification ?
                <Snackbar
                  {...notificationProps}
                  message={this.state.message}
                  styleNotification={this.state.styleNotification}
                />
              : ''}

              {this.state.saveNotification ?
                <Snackbar
                  {...notificationProps}
                  saveNotification={this.state.saveNotification}
                  message={this.state.dataId !== '0' ? "Graph saved to your dashboard!" : "Cannot save graph with sample data"} /> : ''}

              {this.state.notification ? <Snackbar {...notificationProps} /> : ''}
            </div>
          </div>
        )
      }
    } else {
      this.props.history.push('/room')
      return null;
    }
  }
}

EditView.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapDispatchToProps = dispatch => ({
  gotData: function () {
    dispatch(gotData())
  },
  addGraph: function (graphData) {
    dispatch(postGraph(graphData));
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
