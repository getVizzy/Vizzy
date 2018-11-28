import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/SendOutlined'
import People from '@material-ui/icons/People'
import Email from '@material-ui/icons/EmailSharp'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
const io = require('socket.io-client')
const socket = io()
import InviteForm from '../InviteForm'


let styles = theme => ({
  paper: {
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`
  },
  input: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  allmessages: {
    marginTop: '8pt',
    marginBottom: '5pt',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    backgroundColor: '#fafafa'
  },
  header: {
    marginRight: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
  },
  header2: {
    marginRight: theme.spacing.unit,
    backgroundColor: theme.palette.primary.light,
  },
  invite: {
    display: 'flex',
    flexDirection: 'row'
  },
  messages: {
    marginLeft: theme.spacing.unit * 2,
    color: theme.palette.secondary.main,
    backgroundColor: '#fafafa'
  },
  avatar: {
    margin: 10,
    backgroundColor: theme.palette.primary.main
  },
  people: {
    marginRight: theme.spacing.unit
  },
  inviteMessage: {
    marginLeft: '8px'
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
      messages: [],
      chat: true,
      invite: false
    }
    this.typeMessage = this.typeMessage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.scrollToBottom = this.scrollToBottom.bind(this)
    this.toggle = this.toggle.bind(this)
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

  componentDidUpdate() {
    if(this.state.chat) {
      this.scrollToBottom()
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({behavior: 'smooth'})
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
        messages: [...this.state.messages, message],
        messageInput: ''
      })

      socket.emit('newMessages', this.props.singleRoom, message)
    }
  }

  handleKeyDown(e) {
    const user = this.props.user.email

    if (e.key === 'Enter') {
      const newMessage = this.state.messageInput
      if (newMessage) {
        const message = {
          user,
          newMessage
        }
        this.setState({
          messages: [...this.state.messages, message],
          messageInput: ''
        })

        socket.emit('newMessages', this.props.singleRoom, message)
      }
    }
  }

  toggle(button1, button2) {
    if(!this.state[button1]) {
      this.setState({
        [button1]: true,
        [button2]: false,
      })
    }
  }

  render() {
    const {classes} = this.props
    const chatMessages = this.state.messages
    return (
      <div id="chatroomMessages">
        <main className={classes.main}>

          <div className={classes.invite}>
            <Button className={classes.header} onClick={() => this.toggle('chat', 'invite')}>
              <People className={classes.people} /> Chat With Your
              Team
            </Button>

            <Button className={classes.header2} onClick={() => this.toggle('invite', 'chat')} >
              <Email className={classes.people} color="000000" />
              Invite Others to Collaborate
            </Button>
          </div>

          {this.state.chat === true?


          <Paper className={classes.paper}>
            <div className="message-container">
              <Paper className={classes.allmessages}>
                {chatMessages.map((message, index) => {
                  const user = message.user
                  const incomingMessage = message.newMessage
                  return (
                    <div key={index}>
                      <Typography
                        className={classes.messages}
                        key={message.newMessage}
                      >
                        <div className="new-message">
                          <div className="user">{user}</div> : {incomingMessage}
                        </div>
                      </Typography>
                    </div>
                  )
                })}
                <div
                  style={{float: 'left', clear: 'both'}}
                  ref={el => {
                    this.messagesEnd = el
                  }}
                />
              </Paper>
            </div>
            <div className="input-and-button">
              <TextField
                id="standard-full-width"
                name="messageInput"
                label="Enter Your Message"
                style={{margin: 8}}
                value={this.state.messageInput}
                onChange={this.typeMessage}
                fullWidth
                margin="normal"
                variant="outlined"
                onKeyDown={this.handleKeyDown}
              />
              <Avatar className={classes.avatar} onClick={this.handleSubmit}>
                <SendIcon />
              </Avatar>
            </div>
          </Paper>
          :
          <Paper className={classes.paper}>
            <InviteForm text="Email an invite" />
            <p className={classes.inviteMessage}>Or share your room key: {this.props.user.roomKey}.</p>
          </Paper> }
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(Chatroom)

/**
 * PROP TYPES
 */
Chatroom.propTypes = {
  classes: PropTypes.object.isRequired
}
