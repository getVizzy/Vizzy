import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
const io = require('socket.io-client')
const socket = io()
import EditView from '../EditGraphs/EditView'
import {fetchData} from '../../store/user'

class Test extends Component {
  constructor() {
    super()
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.props.onFetchData(this.props.user.user.id)
    //roomId sliced to 1_uniqueString to identify which user created the room. 1 represnets the user that created the room
    // let roomId = this.props.location.pathname.slice(-20,-1)
    // console.log("roomid here",roomId)
    // const currentUser = this.props.user.user.id
    // const users = [...this.state.users,currentUser]
    // socket.emit('room', {room: roomId, user:currentUser})
    // this.setState({ users:users  });
  }

  render() {
    // console.log('EDIT ROOM',this.props)

    // let roomId = this.props.location.pathname.slice(-20,-1)
    console.log('this.props', this.props.data.dataJSON)
    return (
      <div>
        {this.props.data.id}
        {/* <EditView /> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.user.data,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  onFetchData: data => dispatch(fetchData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Test)
