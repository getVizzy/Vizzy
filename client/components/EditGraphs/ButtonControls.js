import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import DirectionsWalk from '@material-ui/icons/DirectionsWalk'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    color: theme.palette.primary.main
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 270
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})

class ButtonControls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: ''
    }
  }
  render() {
    const {classes} = this.props
    return (
      <div>
        <Typography color="primary">{this.state.error}</Typography>
        <div id="controlButtons">
          <div id="ctrlBtn">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                if (
                  this.props.state.dataId !== '0' &&
                  this.props.state.title !== ''
                ) {
                  this.props.addGraph(this.props.state)
                  this.props.saveNotification()
                } else {
                  this.setState({
                    error: 'Please add chart title before saving'
                  })
                }
              }}
            >
              <SaveIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Save Graph
            </Button>
          </div>
          <div id="ctrlBtn">
            <Button
              variant="outlined"
              color="secondary"
              type="button"
              onClick={this.props.leaveRoom}
              className={classes.button}
            >
              <DirectionsWalk
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Exit Room
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

ButtonControls.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ButtonControls)
