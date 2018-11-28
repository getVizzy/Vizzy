import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import EnterRoomForm from './EnterRoomForm'


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    // backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 15
    // padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 2500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    // padding: `${theme.spacing.unit * 8}px 0`,
    padding: 10
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    // paddingTop: '56.25%', // 16:9
    paddingTop: '48%'
  },
  cardContent: {
    flexGrow: 1,
  },

  roomIcon: {
    // paddingTop: 10,
    marginRight: 5
  }
});
const roomImg = 'https://i.ibb.co/DDjqWvB/graphcomputer.jpg'

function RoomEntry(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
              Room Entrance
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Enter your room or join another team member's room
            </Typography>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40} justify="center">
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={roomImg} // eslint-disable-line max-len
                  title="roomImg"
                />
                <CardContent className={classes.cardContent} />
                <CardActions>
                  <EnterRoomForm history={props.history} />
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>

      </main>

    </React.Fragment>
  );
}

RoomEntry.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomEntry);
