import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Modal from 'react-modal'
// import { addData } from '../store/user'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import EditRoom from './EditRoom'



class CreateRoom extends Component {
  constructor() {
    super()
    this.state = {
      link: "",
      roomId: ""
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClick() {
    const userId = String(this.props.user.user.id)
    const randomString = '_' + Math.random().toString(36).substr(2, 9)+ Math.random().toString(36).substr(2, 9)
    const unqiueStr = userId+randomString
    this.setState({link : unqiueStr});
    console.log('STATE:',this.state.link)
    this.props.history.push(`room/${userId}/${unqiueStr}`)

  }

  handleChange(event) {
    this.setState({[event.target.name] : event.target.value  });
  }

  handleSubmit() {
    const userId = String(this.props.user.user.id)
    this.props.history.push(`room/${userId}/${this.state.roomId}`)

  }

  render() {
    console.log('CREATEROOM PROPS',this.props)
    return (
      <div id="globalEdit">
      <button type="button" onClick={this.handleClick}>Create Room</button>
      <form id="roomId" onSubmit={this.handleSubmit}>
           <input
             type="text"
             name="roomId"
             value={this.state.roomId}
             placeholder="Enter Room Id"
             onChange={this.handleChange}   />
         <button type="submit">Join Room</button>
         </form>
      <p></p>
      {
        !this.state.link ? null
        : <div>{this.state.link}</div>
      }


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

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)
