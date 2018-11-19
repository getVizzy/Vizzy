import React from 'react';
import PropTypes from 'prop-types';
import BarChart from '../VictoryBarChart'
import classNames from 'classnames';
import GraphMenu from './GraphMenu'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';





const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

});

  class EditView extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        graphSelected:'bar'
      }
      this.handleGraphSelected = this.handleGraphSelected.bind(this)

    }

    handleGraphSelected(graph) {
      this.setState({graphSelected : graph });
    }

    render () {
      const { classes } = this.props;
      const graphSelected = this.state.graphSelected

    return (
      <div>
        <Paper className={classes.root} elevation={22}>
          <Typography variant="h5" component="h3">
            Edit Graph
          </Typography>
          <Typography component="p">
            Some text
          </Typography>
          {
            graphSelected === 'bar' ? <BarChart />
            : graphSelected === 'line' ? <BarChart />:
            null
          }
          <GraphMenu handleGraphSelected = {this.handleGraphSelected}/>
          <Button variant="contained" size="small" className={classes.button}>
              <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                Save
          </Button>
        </Paper>
      </div>
  );
  }
}

EditView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditView);
