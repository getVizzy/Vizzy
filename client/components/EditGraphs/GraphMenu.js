import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import {withStyles} from '@material-ui/core/styles'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import BarChartIcon from '@material-ui/icons/BarChart'
import PieChartIcon from '@material-ui/icons/PieChart'
import LineChartIcon from '@material-ui/icons/ShowChart'
import ScatterPlotIcon from '@material-ui/icons/ScatterPlot'
import MapChartIcon from '@material-ui/icons/Public'
import BubbleChartIcon from '@material-ui/icons/BubbleChart'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormLabel from '@material-ui/core/FormLabel'
import {truncatedNormal} from '@tensorflow/tfjs-layers/dist/exports_initializers'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    width: 295
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})

class ListItemComposition extends React.Component {
  constructor() {
    super()
    this.state = {
      graph: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = event => {
    this.props.changeStyle(event, 'graphSelected')
    this.setState({graph: event.target.value})
  }

  dataTypes = data => {
    let arr = []

    Object.keys(data[0]).forEach(key => {
      const type = typeof data[0][key]
      if (arr.indexOf(type) === -1) {
        arr.push(type)
      }
    })
    const obj = {
      bar: true,
      line: true,
      scatter: true,
      pie: true
    }
    if (arr.indexOf('number') !== -1) {
      obj.scatter = false
      obj.line = false

      if (arr.indexOf('string') !== -1) {
        obj.pie = false
        obj.bar = false
      }
    }

    return obj
  }

  render() {
    const {classes} = this.props
    const types = this.dataTypes(this.props.data)

    return (
      <FormControl className={classes.formControl}>
        <FormLabel className={classes.labels}>Graph Type</FormLabel>
        <Select
          onChange={e => this.handleChange(e)}
          displayEmpty
          value={this.state.graph}
        >
          <MenuItem value="" />

          <MenuItem
            className={classes.menuItem}
            value="line"
            disabled={types.line}
          >
            <ListItemIcon>
              <LineChartIcon />
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.primary}}
              inset
              primary="Line"
            />
          </MenuItem>

          <MenuItem
            className={classes.menuItem}
            value="bar"
            disabled={types.bar}
          >
            <ListItemIcon className={classes.icon}>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.primary}}
              inset
              primary="Bar"
            />
          </MenuItem>

          <MenuItem
            className={classes.menuItem}
            value="pie"
            disabled={types.pie}
          >
            <ListItemIcon>
              <PieChartIcon />
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.primary}}
              inset
              primary="Pie"
            />
          </MenuItem>

          <MenuItem
            className={classes.menuItem}
            value="scatter"
            disabled={types.scatter}
          >
            <ListItemIcon>
              <ScatterPlotIcon />
            </ListItemIcon>
            <ListItemText
              classes={{primary: classes.primary}}
              inset
              primary="Scatter"
            />
          </MenuItem>
        </Select>
      </FormControl>
    )
  }
}

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ListItemComposition)
