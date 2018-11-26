import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    width: 295,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Axes extends React.Component {
  constructor() {
    super()
    this.state = {
      column: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.changeStyle(event, this.props.column)
    this.setState({
      column: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    let items;
    let name;
    if(this.props.column === 'y') {
      items = this.props.filterColumn(this.props.graphData, 'number')
      this.props.graphSelected === 'pie' ? name = "Values"
      : name = "Left Axis"
    } else {
      this.props.graphSelected === 'scatter' ?
      items = this.props.filterColumn(this.props.graphData, 'number')
      : this.props.graphSelected === 'bar' ?
          items = this.props.filterColumn(this.props.graphData, 'string')
      : items = Object.keys(this.props.graphData[0]);

      name = this.props.graphSelected === 'pie'
        ? "Labels" : "Bottom Axis"
    }

    return (
      <FormControl className={classes.formControl}>
        <FormLabel className={classes.labels} >{name}</FormLabel>

      <Select
        onChange={(e) => this.handleChange(e)}
        displayEmpty
        value={this.state.column}
        className={classes.selectEmpty}>
        <MenuItem value="">
        </MenuItem>

        {items.map(item =>
          <MenuItem className={classes.menuItem} key={item} value={item}>
            {item}
          </MenuItem>
        )}
        </Select>
    </FormControl>
    )
  }
}

Axes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Axes);
