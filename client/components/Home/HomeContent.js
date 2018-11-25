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
import { connect } from 'react-redux'
import FileDrop from '../FileDrop'
import AddIcon from '@material-ui/icons/AddCircle'
import EmailIcon from '@material-ui/icons/Email'
import BarChartIcon from '@material-ui/icons/InsertChart'
import DashboardIcon from '@material-ui/icons/Dashboard'
import CreateIcon from '@material-ui/icons/Create'
import DataIcon from '@material-ui/icons/LibraryBooks'
import HappyIcon from '@material-ui/icons/TagFaces'

import UserDataSets from './UserDataSets'


import CardHeader from '@material-ui/core/CardHeader';
import { Link } from 'react-router-dom'




//images
const tiles = 'https://i.ibb.co/pLtgcSk/colorfultiles.jpg'
const teamworkImg = 'https://i.ibb.co/8Y1QRnT/teamwork-jpg.jpg'
const dataImg = 'https://i.ibb.co/vxQtwMt/data.jpg'
// const graphsImg = 'https://i.ibb.co/sKD0vXn/allgraphs.jpg'
const graphsImg = 'https://i.ibb.co/5Bn5r99/allcharts5.jpg'
const createGraphImg = 'https://i.ibb.co/7kxh190/allcharts4.jpg'


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    // backgroundColor: theme.palette.background.paper,
    backgroundImage: tiles
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    // padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
  contentIcon: {
    marginRight: 20,
  }
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const HomeContent = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Welcome Home
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Let's get Vizzy
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" paragraph>
              Create . Collaborate . Visualize
            </Typography>
            <div className={classes.heroButtons}>
              {/* <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid> */}
            </div>
          </div>
        </div>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          {/* End hero unit */}
          <Grid container spacing={40}>
            {/* {cards.map(card => ( */}
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={dataImg} // eslint-disable-line max-len
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <AddIcon className={classes.contentIcon} color="primary" />
                    Data Import
                  </Typography>
                  <Typography>
                    Have data? You can upload it here and we'll keep it handy for you when it's time to get graphing.
                    </Typography>
                </CardContent>
                <CardActions>
                  <FileDrop />
                  {/* <Button size="small" color="primary">
                    View
                    </Button>
                  <Button size="small" color="primary">
                    Edit
                    </Button> */}
                </CardActions>
              </Card>
            </Grid>
            {/* ))} */}

            {/* card 2 */}
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={teamworkImg} // eslint-disable-line max-len
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <EmailIcon className={classes.contentIcon} color="primary" />
                    {'Invite & Collaborate'}
                  </Typography>
                  <Typography>

                    Data visualization is more fun when collaborating with others. Invite team members to collaborate in real-time to build interactive and insightful graphs.
                    </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Invite Here
                    </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* card 3 */}
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={createGraphImg} // eslint-disable-line max-len
                  title="Image title"

                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <CreateIcon className={classes.contentIcon} color="primary" />
                    Solo Grapher
                  </Typography>
                  <Typography>
                    Don't need to collaborate? You can start graphing right away and still gain meaningful insights from your data.
                    </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link to="/room">Graph here</Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* card 4 */}
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={graphsImg} // eslint-disable-line max-len
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <DashboardIcon className={classes.contentIcon} color="primary" />
                    {`View Past Graphs`}
                  </Typography>
                  <Typography>
                    View all of the interative graphs that you have crafted in one central dashboard. You can download and share these graphs to assist in meaningful discussions and decision making processes.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link to="/room">Dashboard here</Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* card 5 */}
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={graphsImg} // eslint-disable-line max-len
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <DataIcon className={classes.contentIcon} color="primary" />
                    Your Datasets
                  </Typography>
                  <Typography>
                    <UserDataSets />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link to="/room">Dashboard here</Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* card 6 */}
            <Grid item sm={6} md={4} lg={3}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={tiles} // eslint-disable-line max-len
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    <HappyIcon className={classes.contentIcon} color="primary" />
                    Bored?
                  </Typography>
                  <Typography>
                    Take a peek at an interesting graph curated just for you.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link to="/room">Here</Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>

          </Grid>
        </div>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

HomeContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.data,
  user: state.user.user,
  rooms: state.room.rooms,
  singleRoom: state.room.singleRoom,
  allUsers: state.user.allUsers
})


export default connect(mapStateToProps)(
  withStyles(styles)(HomeContent)
)
