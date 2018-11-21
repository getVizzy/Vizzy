import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})

class SimpleSelect extends React.Component {
  state = {
    anchorEl: null,
    selected: 'Choose a column'
  }

  triggerRefresh() {
    this.setState({
      selected: 'Choose a column'
    })
  }

  handleClickListItem = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleMenuItemClick = (event, option) => {
    this.props.changeStyle(option, this.props.column)
    this.setState({selected: option, anchorEl: null})
  }

  handleClose = () => {
    this.setState({anchorEl: null})
  }

  render() {
    const {classes} = this.props
    const {anchorEl} = this.state

    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label={this.props.name}
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={this.props.name}
              secondary={this.state.selected}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem selected />
          {this.props.items.map((option, index) => {
            if (
              this.state.selected !== 'Choose a column' &&
              !this.props.items.includes(this.state.selected)
            ) {
              this.triggerRefresh()
            }
            return (
              <MenuItem
                key={option}
                onClick={event => this.handleMenuItemClick(event, option)}
              >
                {option}
              </MenuItem>
            )
          })}
        </Menu>
      </div>
    )
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleSelect)
