import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../../store'
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import SendIcon from '@material-ui/icons/SendOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
const io = require('socket.io-client')
const socket = io()

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  }
})

/**
 * COMPONENT
 */

class Chatroom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messageInput: '',
      messages: []
    }
    this.typeMessage = this.typeMessage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    socket.emit('joinRoom', this.props.singleRoom, this.props.user)

    socket.on('receiveMessage', message => {
      this.setState({messages: [...this.state.messages, message]})
    })
  }
  typeMessage(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    const user = this.props.user.email
    console.log('user', user)
    const newMessage = this.state.messageInput
    if (newMessage) {
      const message = {
        user,
        newMessage
      }

      this.setState({
        messages: [...this.state.messages, message]
      })
      socket.emit('newMessages', this.props.singleRoom, message)
    }
  }

  render() {
    const {classes} = this.props
    console.log('helloooo', this.props)
    console.log(this.state)
    const chatMessages = this.state.messages
    return (
      <div id="chatroomMessages">
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            {chatMessages.map(message => {
              return (
                <Typography key={message.newMessage}>
                  {message.user}: {message.newMessage}
                </Typography>
              )
            })}
            <input
              type="text"
              name="messageInput"
              value={this.state.messageInput}
              onChange={this.typeMessage}
            />
            <button onClick={this.handleSubmit}>
              <Avatar className={classes.avatar}>
                <SendIcon />
              </Avatar>
            </button>
          </Paper>
        </main>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export default connect(mapSignup, mapDispatch)(withStyles(styles)(Chatroom))

/**
 * PROP TYPES
 */
Chatroom.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
}
