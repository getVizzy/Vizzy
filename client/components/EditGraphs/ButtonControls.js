import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save'
import DirectionsWalk from '@material-ui/icons/DirectionsWalk'
import Button from '@material-ui/core/Button'
import classNames from 'classnames'


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

class ButtonControls extends React.Component {

  handleChange(event) {
    this.props.changeStyle(event, this.props.column)
    this.setState({
      column: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div id="controlButtons">
        <div id="ctrlBtn">
          <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => {
                this.props.saveNotification()
                if(this.props.state.dataId !== '0') {
                  this.props.addGraph(this.props.state);
                }
              }}
            >
              <SaveIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Save Graph
          </Button>
        </div>
          <div id="ctrlBtn">
            <Button
              variant="outlined"
              color="secondary"
              type="button"
              onClick={this.props.leaveRoom}
              className={classes.button}
            >
            <DirectionsWalk
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
              Exit Room
            </Button>
          </div>
        </div>
    )
  }
}

ButtonControls.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonControls);
