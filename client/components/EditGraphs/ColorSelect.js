import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel';
import Chip from '@material-ui/core/Chip';
import LocalFlorist from '@material-ui/icons/LocalFlorist';
import WbSunny from '@material-ui/icons/WbSunny';
import WbCloudy from '@material-ui/icons/WbCloudy';
import Nature from '@material-ui/icons/Nature'
import FilterVintage from '@material-ui/icons/FilterVintage'
import Waves from '@material-ui/icons/Waves'
import Lens from '@material-ui/icons/Lens'
import CloudQueue from '@material-ui/icons/cloudQueue'
import FormControl from '@material-ui/core/FormControl';
import Tooltip from '@material-ui/core/Tooltip';


const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.light,
  },
  icon: {
    color: theme.palette.common.white
  },
  formControl: {
    width: 295,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const colors = ['Sunshine', 'Forest', 'Blue', 'Berry', 'Tomato']
const hexes = ['#FEE090', '#01665E', '#4575B4', '#C51B7D', '#D73027']
const highlights = ['Gold', 'Orchid', 'Sea Green', 'Light Blue', ]
const highHexes = ['#fee090', '#E9A3C9', '#5ab4ac', '#91BFDB']
const labels = {
  Color: {
    name: "Main Color",
    tooltip: "Color of graph"
  },
  Highlight: {
    name: "Highlight Color",
    tooltip: "Color of an element on hover"
  },

}

class ColorSelect extends React.Component {
  constructor() {
    super()
    this.state = {
      color: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, color) {
    this.props.changeStyle(color, this.props.name.toLowerCase())
    this.setState({
      color: color
    });
  };

  render() {
    const {classes} = this.props

    const colorIcons = [
      <WbSunny className={classes.icon} />,
      <Nature className={classes.icon}/>,
      <WbCloudy className={classes.icon}/>,
      <LocalFlorist className={classes.icon}/>,
      <Lens className={classes.icon} />
    ]

    const highIcons = [
      <Lens className={classes.icon}/>,
      <FilterVintage className={classes.icon}/>,
      <Waves className={classes.icon}/>,
      <CloudQueue className={classes.icon}/>
    ]

    let theseColors = this.props.name === 'Color' ? colors : highlights;
    let codes = this.props.name === 'Color' ? hexes : highHexes;
    let icons = this.props.name === 'Color' ? colorIcons : highIcons;
    return (
      <FormControl className={classes.formControl}>
        <Tooltip
            title={labels[this.props.name].tooltip}
            placement="bottom-start">
          <FormLabel>{labels[this.props.name].name}</FormLabel>
        </Tooltip>

        <div className={classes.root}>
          {theseColors.map((option, i) =>
            <Chip
              onClick={(e) => this.handleChange(e, codes[i])}
              icon={icons[i]}
              key={i}
              label={theseColors[i]}
              clickable
              className={classes.chip}
              color={classes.chip.backgroundColor}
              value={colors[i]}
            />
          )}
        </div>
    </FormControl>
    )
  }
}

ColorSelect.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ColorSelect)


