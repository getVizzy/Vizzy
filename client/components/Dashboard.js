import React, { Component } from 'react'
import { connect } from 'react-redux'
import BarChart from './BarChart'
import LineChart from './LineChart'

const io = require('socket.io-client')
const socket = io()
// import socket from '../socket'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      select: '',
      text: ''
    }
    socket.on('receiveCode', payload => {
      this.updateCodeFromSockets(payload)
    })
    this.onChange = this.onChange.bind(this)
  }

  updateCodeFromSockets(payload) {
    this.setState(payload)
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    // socket.emit('new changes','4kvi2mukbi9rkzz0p7', {
    //   [event.target.name]: event.target.value
    // })
    socket.emit('newChanges', this.props.singleRoom, {
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() { }
  render() {
    // console.log('state', this.state)
    // console.log('this.props', this.props)
    // console.log('DASHBOARD', this.props)
    return (
      <div id="container-row">
        <div>
          <div>
            Your Room Id is: {this.props.singleRoom}, please share with
            participants
          </div>
          <form>
            <input
              type="text"
              name="text"
              onChange={this.onChange}
              placeholder="Type Here"
            />
          </form>
        </div>

        <div>{/* <BarChart data={data} /> */}</div>
        <div>{/* <LineChart data={data} /> */}</div>

        <div>
          <select name="select" onChange={this.onChange}>
            <option value="Blue">Blue</option>
            <option value="Yellow">Yellow</option>
            <option value="Red">Red</option>
            <option value="Orange">Orange</option>
            <option value="Pink">Pink</option>
          </select>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.user.data,
  rooms: state.room.rooms,
  singleRoom: state.room.singleRoom
})

export default connect(mapStateToProps)(Dashboard)
