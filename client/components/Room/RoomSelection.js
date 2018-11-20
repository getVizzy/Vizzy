import React, { Component } from 'react'
import {connect} from 'react-redux'
import socket from '../../socket'
import {postRoom, fetchRooms} from '../../store/room'


class RoomSelection extends Component {
  constructor() {
    super()
    this.state = {
      roomKey: "",
      rooms: []
    }

    this.handleCreateRoom = this.handleCreateRoom.bind(this)
    this.joinRoomInput = this.joinRoomInput.bind(this)
    this.joinRoomSubmit = this.joinRoomSubmit.bind(this)
  }

  async componentDidMount() {
    let rooms = await this.props.onFetchRooms()
    console.log('HERE',rooms)
    // let roomKeys = rooms.map(currentRoom => currentRoom.roomKey)
    this.setState({rooms : rooms });
  }


  handleCreateRoom() {
    const roomKey = Math.random().toString(36).substr(2, 9)+ Math.random().toString(36).substr(2, 9)
    console.log('roomKey', roomKey)
    const userName = this.props.user.user.name

    this.props.onPostRoom({roomKey:roomKey})
    this.setState({roomKey : roomKey});

    socket.emit('createRoom', roomKey, userName)

    this.props.history.push('room/live')
  }

  joinRoomInput(event) {
    this.setState({[event.target.name] : event.target.value  });
    console.log('state rooms', this.state.rooms)
    console.log('state roomkey ', this.state.roomKey)
  }

  joinRoomSubmit() {
      console.log('state rooms', this.state.rooms)
      console.log('state room ', this.state.roomKey)
      let rooms = this.state.rooms
      let roomKey = this.state.roomKey

      // if (rooms[roomKey]) {
      //   this.props.history.push('room/live')
      // }
      // else {
      //   console.log('No Room FOUND!')
      // }
    // if(this.state.rooms.includes(this.state.roomKey)) this.props.history.push('room/live')
    // else console.log('No Room FOUND!')

  }

  render() {
    console.log('ROOM SELECTION PROPS',this.props)
    console.log('ROOM SELECTION STATE',this.state)

    return (
      <div>
      <button type="button" onClick={this.handleCreateRoom}>Create Room</button>
      <form id="roomId" onSubmit={this.joinRoomSubmit}>
           <input
             type="text"
             name="roomKey"
             value={this.state.roomId}
             placeholder="If you would like to join an existing meeting, input the room information below"
             onChange={this.joinRoomInput}   />
         <button type="submit">Join Room</button>
         </form>
      {
        !this.state.roomKey ? null
        : <div>{this.state.roomKey}</div>
      }


      </div>
      )
    }
  }

const mapStateToProps = (state) => ({
  data: state.user.data,
  user: state.user,
  room: state.room
})

const mapDispatchToProps = (dispatch) => ({
  onPostRoom: (room) => dispatch(postRoom(room)),
  onFetchRooms: () => dispatch(fetchRooms())
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomSelection)
