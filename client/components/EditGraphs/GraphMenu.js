import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
import LineChartIcon from '@material-ui/icons/ShowChart';
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot';
import MapChartIcon from '@material-ui/icons/Public';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';


const styles = theme => ({

  formControl: {
    margin: theme.spacing.unit,
    width: 270,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});


class ListItemComposition extends React.Component {

  state = {
    graph: '',
  };

  handleChange = event => {
    this.props.changeStyle(event, 'graphSelected')
    this.setState({ graph: event.target.value });
  };

  render() {
  const { classes } = this.props;

  return (
    <FormControl className={classes.formControl}>
      <FormLabel className={classes.labels} >Graph Type</FormLabel>
      <Select
        onChange={(e) => this.handleChange(e)}
        displayEmpty
        value={this.state.graph}>
      <MenuItem value="">
      </MenuItem>

      <MenuItem className={classes.menuItem} value="line">
        <ListItemIcon >
          <LineChartIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Line" />
      </MenuItem>

      <MenuItem className={classes.menuItem} value="bar" >
        <ListItemIcon className={classes.icon}>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Bar" />
      </MenuItem>

      <MenuItem className={classes.menuItem} value="pie">
        <ListItemIcon>
          <PieChartIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Pie" />
      </MenuItem>

      <MenuItem className={classes.menuItem} value="scatter">
        <ListItemIcon>
          <ScatterPlotIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Scatter" />
      </MenuItem>

      <MenuItem className={classes.menuItem} value="map">
        <ListItemIcon>
          <MapChartIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Map" />
      </MenuItem>

      <MenuItem className={classes.menuItem} value="bubble">
        <ListItemIcon>
          <BubbleChartIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Bubble" />
      </MenuItem>
      </Select>
    </FormControl>  );
  }
}

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);
