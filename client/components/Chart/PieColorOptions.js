import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';

let colorThemes = {
  forest: ["#8c510a", "#d8b365", "#f6e8c3", "#c7eae5", "#5ab4ac", "#01665e"],
  sweet: ["#c51b7d", "#e9a3c9", "#fde0ef", "#e6f5d0", "#a1d76a", "#4d9221"],
  orchid: ["#762a83", "#af8dc3", "#e7d4e8", "#d9f0d3", "#7fbf7b", "#1b7837"],
  sunshine: ["#d73027", "#fc8d59", "#fee090", "#e0f3f8", "#91bfdb", "#4575b4"],
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 270,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class PieColorOptions extends Component {
  constructor() {
    super()
    this.state = {
      theme: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    console.log("TARGET IN HC", event)
    this.props.changeStyle(colorThemes[event.target.value], 'pieColor')

    this.setState({
      theme: event.target.value
    });
  };

  render() {
    const {classes} = this.props

    return (
      <FormControl className={classes.formControl}>
          <FormLabel className={classes.labels} >Color Theme</FormLabel>

          <Select
            onChange={(e) => this.handleChange(e)}
            displayEmpty
            value={this.state.theme}
            className={classes.selectEmpty}>

            <MenuItem value="" />

            {Object.keys(colorThemes).map((option) =>
              <MenuItem key={option} value={option} className={classes.menuItem}>
                {option}
              </MenuItem>
            )}
          </Select>
        </FormControl>
    )
  }
}

PieColorOptions.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PieColorOptions)
