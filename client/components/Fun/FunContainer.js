import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import DoubleLine from '../Chart/DoubleLine'
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 15
    // padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: 1
  },
});

function Fun(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
              Graph of the Day
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Interesting visualizations created for you
            </Typography>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <DoubleLine />
        </div>
      </main>

    </React.Fragment>
  );
}

Fun.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Fun);
