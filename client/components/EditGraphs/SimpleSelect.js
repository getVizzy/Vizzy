import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormLabel from '@material-ui/core/FormLabel'
import Tooltip from '@material-ui/core/Tooltip'

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

const pointers = ['Rounded edge', 'Square', 'Circle']

const labels = {
  Dataset: {
    name: 'Dataset',
    tooltip: 'Select from saved data'
  },
  Pointer: {
    name: 'Info Box',
    tooltip: 'Shape of info box on hover'
  },
  'Pie Style': {
    name: 'Pie Style',
    tooltip: 'Shape of pie'
  }
}

class SimpleSelect extends React.Component {
  constructor() {
    super()
    this.state = {
      data: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    let attribute =
      this.props.name === 'Dataset'
        ? 'dataId'
        : this.props.name === 'Pointer' ? 'tooltip' : 'pieTransformation'
    if (event.target.value !== '0') {
      this.props.changeStyle(event.target.value, attribute)
    } else {
      this.props.changeStyle('0', attribute)
    }
    this.setState({
      data: event.target.value
    })
  }

  render() {
    const {classes} = this.props
    return (
      <FormControl className={classes.formControl}>
        <Tooltip
          title={labels[this.props.name].tooltip}
          placement="bottom-start"
        >
          <FormLabel className={classes.labels}>
            {labels[this.props.name].name}
          </FormLabel>
        </Tooltip>
        <Select
          onChange={e => this.handleChange(e)}
          displayEmpty
          value={this.state.data}
          className={classes.selectEmpty}
        >
          <MenuItem value="" />

          {this.props.name === 'Dataset' ? (
            <MenuItem value="0">Sample Data - Data Cannot Be Saved</MenuItem>
          ) : (
            ''
          )}

          {this.props.items.map((option, i) => {
            let val = this.props.name === 'Dataset' ? option.id : option
            let display =
              this.props.name === 'Dataset'
                ? option.dataJSON.name
                : this.props.name === 'Pointer' ? pointers[i] : option

            return (
              <MenuItem key={i} value={val} className={classes.menuItem}>
                {display}
              </MenuItem>
            )
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
