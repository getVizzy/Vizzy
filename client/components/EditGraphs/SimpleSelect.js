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
});

class SimpleSelect extends React.Component {
  state = {
    selected: 'Sample Data'
  }

  handleChange(event) {
    this.props.changeStyle(event.target.value.id, 'dataId')
    this.setState({
      selected: event.target.value.dataJSON.name,
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
          value={this.state.selected}
          className={classes.selectEmpty}>

          <MenuItem value='0'>Sample Data</MenuItem>

          {this.props.items.map((option) =>
            // if (
            //   this.state.selected !== 'Choose a dataset' &&
            //   !this.props.items.includes(this.state.selected)
            // ) {
            //   this.triggerRefresh()
            // }
              <MenuItem value={option}>
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
