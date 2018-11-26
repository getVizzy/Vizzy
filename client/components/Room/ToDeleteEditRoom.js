import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
const io = require('socket.io-client')
const socket = io()
import EditView from '../EditGraphs/EditView'




class EditRoom extends Component {
  constructor() {
    super()
    this.state = {
      users: []
    }

    socket.on('new user join', (users) => this.joinUser(users))
    socket.on('user left room', (user) => this.removeUser(user))

  }

  componentDidMount() {
    //roomId sliced to 1_uniqueString to identify which user created the room. 1 represnets the user that created the room
    let roomId = this.props.location.pathname.slice(-20,-1)
    console.log("roomid here",roomId)
    const currentUser = this.props.user.user.id
    const users = [...this.state.users,currentUser]
    socket.emit('room', {room: roomId, user:currentUser})
    this.setState({ users:users  });

  }


  render() {
    console.log('EDIT ROOM',this.props)

    let roomId = this.props.location.pathname.slice(-20,-1)
    return (
      <div>
      <div>Your Room ID: {roomId}</div>
      <EditView />
      </div>
      )
    }
  }

const mapStateToProps = (state) => ({
  data: state.user.data,
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  addData: (data) => dispatch(addData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditRoom)
