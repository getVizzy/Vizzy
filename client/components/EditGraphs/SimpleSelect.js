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

class SimpleSelect extends React.Component {
  constructor() {
    super()
    this.state = {
      set: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let name;
    if(event.target.value !== '0') {
      name = event.target.value.dataJSON.name
      this.props.changeStyle(event.target.value.id, 'dataId')
    } else {
      name = "Sample Data"
      this.props.changeStyle('0', 'dataId')
    }

    this.setState({
      set: name,
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
          value={this.state.set}
          className={classes.selectEmpty}>
          <MenuItem value=""></MenuItem>

          <MenuItem value='0'>Sample Data</MenuItem>

          {this.props.items.map((option) =>
            // if (
            //   this.state.selected !== 'Choose a dataset' &&
            //   !this.props.items.includes(this.state.selected)
            // ) {
            //   this.triggerRefresh()
            // }
              <MenuItem key={option.id} value={option} className={classes.menuItem}>
                {option.dataJSON.name}
              </MenuItem>
          )}
        </Select>
    </FormControl>
    )
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleSelect)
