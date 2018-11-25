import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';

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

const pointers = ["Rounded edge", "Square", "Circle"]

class SimpleSelect extends React.Component {
  constructor() {
    super()
    this.state = {
      data: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let attribute = this.props.name === 'Dataset' ? 'dataId' : 'tooltip'
    if(event.target.value !== '0') {
      this.props.changeStyle(event.target.value, attribute)
    } else {
      this.props.changeStyle('0', attribute)
    }
    this.setState({
      data: event.target.value
    });
  };

  render() {
    const {classes} = this.props
    return (
      <FormControl className={classes.formControl}>
        <FormLabel className={classes.labels} >{this.props.name}</FormLabel>

        <Select
          onChange={(e) => this.handleChange(e)}
          displayEmpty
          value={this.state.data}
          className={classes.selectEmpty}>

          <MenuItem value="" />
          { this.props.name === 'Dataset' ?
          <MenuItem value='0'>Sample Data</MenuItem>
          : '' }

          {this.props.items.map((option, i) => {
            // if (
            //   this.state.selected !== 'Choose a dataset' &&
            //   !this.props.items.includes(this.state.selected)
            // ) {
            //   this.triggerRefresh()
            // }
            let val = this.props.name === 'Dataset' ? option.id : option
            let display = this.props.name === 'Dataset' ? option.dataJSON.name : pointers[i]

              return <MenuItem key={option.id} value={val} className={classes.menuItem}>
                {display}
              </MenuItem>
          })}
        </Select>
    </FormControl>
    )
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleSelect)
