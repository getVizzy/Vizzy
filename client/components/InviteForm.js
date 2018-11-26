import {axios} from 'axios'
import React from 'react'
import FormControl from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel'
import PropTypes from 'prop-types'

export default class InviteForm extends React.Component {
  clickHandler(e) {
    console.log(e.target.name)
  }
  render() {
    return (
      <div>
        <FormLabel>Emails:</FormLabel>

        <TextField
          id="filled-name"
          required={true}
          value={this.props.title}
          onChange={e => this.props.titleChange(e)}
          margin="normal"
        />
        <FormLabel>Optional Note: </FormLabel>
        <TextField
          id="filled-name"
          required={true}
          value={this.props.title}
          onChange={e => this.props.titleChange(e)}
          margin="normal"
        />
        <Button onClick={this.clickHandler}>Send Invite</Button>
      </div>
    )
  }
}
