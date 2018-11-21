import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
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



const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {
    // color: '#71A9F7'
  },


});

function ListItemComposition(props) {
  const { classes } = props;

  return (
    <MenuList>

      <MenuItem className={classes.menuItem} onClick={() => props.handleGraphSelected('bar')}>
        <ListItemIcon className={classes.icon}>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Bar" />
      </MenuItem>

      <MenuItem className={classes.menuItem} onClick={() => props.handleGraphSelected('pie')}>
        <ListItemIcon className={classes.icon}>
          <PieChartIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Pie" />
      </MenuItem>

      <MenuItem className={classes.menuItem} onClick={() => props.handleGraphSelected('line')}>
        <ListItemIcon className={classes.icon}>
          <LineChartIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Line" />
      </MenuItem>

      <MenuItem className={classes.menuItem} onClick={() => props.handleGraphSelected('scatter')}>
        <ListItemIcon className={classes.icon}>
          <ScatterPlotIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Scatter" />
      </MenuItem>

      <MenuItem className={classes.menuItem} onClick={() => props.handleGraphSelected('map')}>
        <ListItemIcon className={classes.icon}>
          <MapChartIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Map" />
      </MenuItem>

      <MenuItem className={classes.menuItem} onClick={() => props.handleGraphSelected('bubble')}>
        <ListItemIcon className={classes.icon}>
          <BubbleChartIcon />
        </ListItemIcon>
        <ListItemText classes={{ primary: classes.primary }} inset primary="Bubble" />
      </MenuItem>

    </MenuList>
  );
}

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);
