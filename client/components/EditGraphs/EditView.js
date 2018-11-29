import React from 'react'
import PropTypes from 'prop-types'
import {fetchAllUsers} from '../../store/user'
import ChartContainer from '../Chart/ChartContainer'
import {gotData} from '../../store/data'
import {postGraph} from '../../store/graph'
const io = require('socket.io-client')
const socket = io()
import Menu from './Menu'
import {connect} from 'react-redux'
import {reinstateNumbers, download, addComma} from '../../utils'
import {withStyles} from '@material-ui/core/styles'
import Snackbar from '../Notifications/Snackbar'
import Chatroom from './Chatroom'
import PlaceholderContainer from '../Chart/PlaceholderContainer'
import Progress from './Progress'
import CssBaseline from '@material-ui/core/CssBaseline'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: '0 auto'
  },
  chatroom: {
    display: 'block'
  }
})

const sampleData = {
  dataJSON: {
    data: [
      {quarter: '1', earnings: 13, items: 40, state: 'NY'},
      {quarter: '2', earnings: 16, items: 60, state: 'NJ'},
      {quarter: '3', earnings: 17, items: 70, state: 'PA'},
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
      graphSelected: '',
      color: '#4575B4',
      title: '',
      highlight: '#FEE090',
      tooltip: '5',
      x: '',
      y: '',
      regression: false,
      regressionLine: [],
      regressionModel: {},
      dataId: '',
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
      saveNotification: false,
      error: '',
      graphic: 0,
      titleInProgress: '',
      userThatMadeChanges: ''
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

    socket.on('receiveCode', payload => {
      this.updateCodeFromSockets(payload)
    })
  }

  changeStyle(e, attribute, source, user) {
    let updated =
      e && e.target
        ? (updated = {value: e.target.value, user: this.props.user.email})
        : (updated = {value: e, user: this.props.user.email})

    switch (attribute) {
      case 'dataId':
        if (updated.value !== '0') {
          updated = {
            value: +e,
            user: updated.user
          }
        }
        this.setState({
          [attribute]: updated.value,
          userThatMadeChanges: updated.user,
          title: '',
          x: '',
          y: '',
          regression: false,
          regressionLine: [],
          regressionModel: {},
          graphic: 1
        })
        break
      case 'graphSelected':
        this.setState({
          [attribute]: updated.value,
          userThatMadeChanges: updated.user,
          x: '',
          y: '',
          regression: false,
          regressionLine: [],
          title: ''
        })
        break
      case 'pieColor':
        this.setState({
          pieColor: updated.value,
          userThatMadeChanges: updated.user
        })
        break
      case 'pieTransformation':
        let valueChange = updated.value
        // updated.value = value.toLowerCase()
        this.setState({
          pieTransformation: valueChange.toLowerCase(),
          userThatMadeChanges: updated.user
        })
        break
      case 'title':
        this.setState({
          titleInProgress: '',
          userThatMadeChanges: updated.user
        })
      default:
        this.setState({
          [attribute]: updated.value,
          userThatMadeChanges: updated.user
        })
    }
    let change = {
      [attribute]: updated.value,
      userThatMadeChanges: updated.user
    }

    if (attribute === 'dataId') {
      change.graphSelected = 'line'
    }
    if (!source) {
      socket.emit('newChanges', this.props.singleRoom, change)
    }
  }

  styleNotification(attribute, updated, user) {
    let message
    switch (attribute) {
      case 'x':
        message = `${user} changed X axis to ${updated}`
        break
      case 'y':
        message = `${user} changed Y axis to ${updated} `
        break
      case 'dataId':
        message = `${user} changed new dataset`
        break
      case 'graphSelected':
        message = `${user} changed graph to ${updated}`
        break
      case 'color':
        message = `${user} changed color`
        break
      case 'pieColor':
        message = `${user} changed pie color`
        break
      case 'tooltip':
        message = `${user} changed tooltip shape`
        break
      default:
        message = `${user} updated ${attribute}`
    }

    this.setState({
      message: message,
      styleNotification: !this.state.styleNotification
    })
  }

  titleChange(e) {
    this.setState({
      titleInProgress: e.target.value
    })
  }

  titleSubmit(e) {
    this.changeStyle(this.state.titleInProgress, 'title')
  }

  updateCodeFromSockets(payload) {
    let attribute = Object.keys(payload)[0]
    let updated = Object.values(payload)[0]
    let user = Object.values(payload)[1]
    this.changeStyle(updated, attribute, 'sockets')
    this.styleNotification(attribute, updated, user)
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
      saveNotification: true,
      title: ''
    })
  }

  resetSnackbar() {
    this.setState({
      styleNotification: false,
      saveNotification: false
    })
  }

  render() {
    const {classes} = this.props
    const graphics = [<PlaceholderContainer />, <Progress {...this.state} />]

    const matchingUser = this.props.allUsers.filter(user => {
      return user.roomKey === this.props.singleRoom
    })

    if (matchingUser[0]) {
      const dataMatch = matchingUser[0].data
      let data

      if (!dataMatch) {
        return 'Loading...'
      } else {
        if (this.state.dataId === '') {
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
          <React.Fragment>
            <CssBaseline />

            <main>
              <div>
                <div id="edit" className={classes.root}>
                  {/*CHART CONTAINER */}
                  <div id="editChart">
                    {this.state.x === '' || this.state.y === '' ? (
                      <div id="working">{graphics[this.state.graphic]}</div>
                    ) : (
                      <ChartContainer {...propPackage} />
                    )}
                  </div>

                  {/*MENU PANEL */}
                  <div id="editMenu">
                    <Menu {...propPackage} />

                    {/*SNACKBAR NOTIFICATIONS */}
                    {this.state.styleNotification ? (
                      <Snackbar
                        {...notificationProps}
                        message={this.state.message}
                        styleNotification={this.state.styleNotification}
                      />
                    ) : (
                      ''
                    )}

                    {this.state.saveNotification ? (
                      <Snackbar
                        {...notificationProps}
                        saveNotification={this.state.saveNotification}
                        message={
                          this.state.dataId !== '0'
                            ? 'Graph saved to your dashboard!'
                            : 'Cannot save graph with sample data'
                        }
                      />
                    ) : (
                      ''
                    )}

                    {this.state.notification ? (
                      <Snackbar {...notificationProps} />
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className={classes.chatroom}>
                  <Chatroom
                    singleRoom={this.props.singleRoom}
                    user={this.props.user}
                  />
                </div>
              </div>
            </main>
          </React.Fragment>
        )
      }
    } else {
      this.props.history.push('/room')
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
