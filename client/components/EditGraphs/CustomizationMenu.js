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
  icon: {
    // color: '#71A9F7'
  },
});


export default function CustomizationMenu(props) {
  console.log("DATA IN CUSTOM", props.data)
  return (
    <div id="controls">
      <p>Choose a Dataset:</p>
      <select onChange={e => props.changeStyle(e, 'dataId')}>
        <option />
        {props.data.map((elem, i) => (
          <option key={i} value={elem.id}>
            {elem.id}
          </option>
        ))}
      </select>
      <p>Left Axis:</p>
      <select onChange={e => props.changeStyle(e, 'y')}>
        <option />
        {Object.keys(props.data[0]).map((key, i) => (
          <option key={i} value={key}>
            {key}
          </option>
        ))}
      </select>

      <p>Bottom Axis:</p>
      <select onChange={e => props.changeStyle(e, 'x')}>
        <option />
        {Object.keys(props.data[0]).map((key, i) => (
          <option key={i} value={key}>
            {key}
          </option>
        ))}
      </select>

      <p>Bar Color:</p>
      <select onChange={e => props.changeStyle(e, 'color')}>
        <option value="tomato">Tomato</option>
        <option value="gold">Gold</option>
        <option value="orange">Orange</option>
        <option value="#f77">Salmon</option>
        <option value="#55e">Purple</option>
        <option value="#8af">Periwinkle</option>
      </select>

      <p>Bar Highlight:</p>
      <select onChange={e => props.changeStyle(e, 'highlight')}>
        <option value="orange">Orange</option>
        <option value="tomato">Tomato</option>
        <option value="gold">Gold</option>
        <option value="#f77">Salmon</option>
        <option value="#55e">Purple</option>
        <option value="#8af">Periwinkle</option>
      </select>

      <p>Pointer:</p>
      <select onChange={e => props.changeStyle(e, 'tooltip')}>
        <option value={5}>Round edge</option>
        <option value={0}>Square</option>
        <option value={25}>Circle</option>
      </select>

      <p>Graph Title:</p>
      <input
        value={props.title}
        onChange={e => props.changeStyle(e, 'title')}
      />
    </div>
    )
  }
