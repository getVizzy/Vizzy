import axios from 'axios'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default class InviteForm extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      to: '',
      note: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleClickOpen = () => {
    this.setState({open: true})
  }

  handleClose = e => {
    this.setState({open: false})
    let body = {}
    body.to = this.state.to
    body.note = this.state.note
    body.room = this.props.user.roomKey
    body.userEmail = this.props.user.email
    axios.post('/api/room/email', body)
  }

  render() {
    return (
      <div>
        <Button size="small" color="primary" onClick={this.handleClickOpen}>
          Invite Here
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Invite Collaborators</DialogTitle>
          <DialogContent>
            <TextField
              onChange={this.handleChange}
              name="to"
              required={true}
              value={this.props.title}
              margin="normal"
              label="Email:"
            />
            <TextField
              onChange={this.handleChange}
              name="note"
              required={true}
              value={this.props.title}
              margin="normal"
              label="Optional Note"
              fullWidth
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
